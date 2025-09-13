import React from 'react'
import './Help.css'

export default function Help({setShowHelp}) {
    return (
        <div className="help-overlay">
            <div className="help-box">
                <h2>📖 Instructions</h2>
                <ul>
                    <li><b>Greetings:</b> say "good morning"</li>
                    <li><b>Open YouTube:</b> "open youtube and search [query]"</li>
                    <li><b>Open ChatGPT:</b> "open chat gpt"</li>
                    <li><b>Open Website:</b> "open [website]"</li>
                    <li><b>Play Song:</b> "play song [name]"</li>
                    <li><b>Time:</b> "tell me the time"</li>
                    <li><b>Date:</b> "tell me the date"</li>
                    <li><b>Reminder:</b> "remind me to [task]"</li>
                    <li><b>Check Reminder:</b> "what is my reminder"</li>
                    <li><b>Calculate:</b> "calculate [expression]"</li>
                    <li><b>Search:</b> "search [any this you want to search]"</li>
                </ul>
                <button className="close-btn" onClick={() => setShowHelp(false)}>Close</button>
            </div>
        </div>
    )
}
