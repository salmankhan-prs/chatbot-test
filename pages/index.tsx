import { useChat } from 'ai/react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveResponse } from '../store'

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface SavedResponse {
  _id: string;
  message: Message;
  timestamp: string;
}

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const dispatch = useDispatch<any>()
  const [userId, setUserId] = useState('')
  const [token, setToken] = useState('')
  const [savedResponses, setSavedResponses] = useState<SavedResponse[]>([])
  const [activeTab, setActiveTab] = useState('chat')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      fetchSavedResponses(storedToken)
    }
  }, [])

  const fetchSavedResponses = async (userToken: string) => {
    try {
      const response = await fetch('/api/get-responses', {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setSavedResponses(data.responses)
      }
    } catch (error) {
      console.error('Failed to fetch saved responses:', error)
    }
  }

  const handleSaveResponse = async (message: Message) => {
    try {
      const response = await fetch('/api/save-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, message }),
      })

      if (response.ok) {
        dispatch(saveResponse(message))
        fetchSavedResponses(token)
        alert('Response saved successfully!')
      } else {
        throw new Error('Failed to save response')
      }
    } catch (error) {
      console.error('Error saving response:', error)
      alert('Failed to save response. Please try again.')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chatbot Interface</h1>
      <div className="mb-4">
        <button 
          onClick={() => setActiveTab('chat')} 
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'chat' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Chat
        </button>
        <button 
          onClick={() => setActiveTab('history')} 
          className={`px-4 py-2 rounded ${activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          History
        </button>
      </div>
      {activeTab === 'chat' ? (
        <>
          <div className="border rounded p-4 h-96 overflow-y-auto mb-4">
            {messages.map((message: any) => (
              <div key={message.id} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {message.content}
                </span>
                {message.role === 'assistant' && (
                  <button 
                    onClick={() => handleSaveResponse(message)} 
                    className="mt-2 bg-green-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Save Response
                  </button>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="flex-grow border rounded-l p-2"
              placeholder="Type your message..."
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
              Send
            </button>
          </form>
        </>
      ) : (
        <div className="border rounded p-4 h-96 overflow-y-auto">
          {savedResponses.map((response) => (
            <div key={response._id} className="mb-4">
              <span className="inline-block p-2 rounded bg-gray-200">
                {response.message.content}
              </span>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(response.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}