import React, { useState } from 'react'
import { MentionsInput, Mention, type OnChangeHandlerFunc, type OnAddHandlerFunc } from 'react-mentions'
import './App.css' // make sure you import the CSS below somewhere

const MENTION_OPTIONS = [
  { id: 'apple', display: '@apple' },
  { id: 'banana', display: '@banana' },
  { id: 'cat', display: '@cat' },
  // …etc
]

function App() {
  const [text, setText] = useState('')
  // Removed unused state since we're not using it right now

  // react-mentions gives you the “plain” + the “markup” (we’ll just use markup state)
  const handleChange: OnChangeHandlerFunc = (_, newValue) => {
    setText(newValue)
  }

  // Handle when a mention is added
  const handleAddMention: OnAddHandlerFunc = (id, display) => {
    console.log(`Mentioned ${display} (${id})`)
    // You can use this for any post-selection logic if needed
  }

  return (
    <div className="p-4">
      <h1 className="mb-4">Mention Demo</h1>

      <MentionsInput
        value={text}
        onChange={handleChange}
        placeholder="Type @ to mention…"
        className="mentions-input"
        allowSuggestionsAboveCursor={true}
        forceSuggestionsAboveCursor={true}
        autoFocus
        a11ySuggestionsListLabel="Mention suggestions"
        style={{
          control: {
            backgroundColor: 'white',
            fontSize: 16,
            lineHeight: 1.5,
            padding: 8,
            border: '1px solid #ddd',
            borderRadius: 4,
            minHeight: 100,
            overflow: 'auto'
          },
          highlighter: {
            overflow: 'hidden'
          },
          input: {
            margin: 0
          }
        }}
      >
        <Mention
          trigger="@"
          data={MENTION_OPTIONS}
          markup="@[__display__]"
          displayTransform={(_id, display) => `@${display}`}
          onAdd={handleAddMention}
          appendSpaceOnAdd={true}
          style={{
            backgroundColor: '#C6F6D5',
            color: '#22543D',
            padding: '2px 1px',
            borderRadius: '3px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block',
            position: 'relative',
            zIndex: 1
          }}
          className="mentions__mention"
          renderSuggestion={(_suggestion, _search, highlightedDisplay, _index, focused) => (
            <div 
              className={`mention-suggestion ${focused ? 'focused' : ''}`}
              style={{
                padding: '5px 10px',
                backgroundColor: focused ? '#f0f0f0' : 'white',
                cursor: 'pointer'
              }}
            >
              {highlightedDisplay}
            </div>
          )}
        />
      </MentionsInput>
    </div>
  )
}

export default App
