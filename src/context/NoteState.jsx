import React, { useEffect } from 'react';
import noteContext from './noteContext.js';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { evaluate } from "mathjs"   // for safe calculations (mathjs package)


export default function NoteState({ children }) {

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    function speak(text, callback) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.onend = () => {
            console.log("Speech synthesis completed.");
            if (callback) callback();
        }

        synth.speak(utterance);
    }

    function utils(url, say) {
        url && window.open(url);
        speak(say);
    }

    function task() {
        const text = transcript.toLowerCase();

        // for wish goodmorning
        if (text.includes('good morning')) {
            speak("Goood Morning, Sir");
            speak("How may i help you?", SpeechRecognition.startListening)
        }

        // for open yt and search 
        else if (text.includes('open youtube and search')) {
            let query = text.replace('open youtube and search ', '');
            utils(
                `https://www.youtube.com/results?search_query=${query}`,
                `Sure sir, Opening youtube and searching for ${query}`
            )
        }

        // for open chatGPT 
        else if (text.includes('open chat gpt')) {
            utils(
                `https://chatgpt.com/`,
                `Sure sir, Opening chatGPT`
            )
        }

        // for open any website
        else if (text.includes('open')) {
            let query = text.replace('open ', '');
            utils(
                `https://www.${query}.com`,
                `Sure sir, Opening ${query}`
            )
        }

        // for open any website
        else if (text.includes('search')||text.includes('search about')) {
            let query = text.replace('search ', '').replace('search about ', '');
            utils(
                `https://www.google.com/search?q=${query}`,
                `Sure sir, Searching ${query}`
            )
        }

        // for play song
        else if (text.includes('play song')) {
            let query = text.replace('play song ', '');
            utils(
                `https://open.spotify.com/search/${query}`,
                `Sure sir, Playing song ${query} on spotify`
            )
        }

        // for time
        else if (text.includes('tell me the time') || text.includes('tell me time')) {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12; // convert 0 → 12
            speak(`The time is ${hours}:${minutes} ${ampm}`);
        }

        //for date
        else if (text.includes('tell me the date') || text.includes('tell me date')) {
            const now = new Date();
            speak(`Today is ${now.toDateString()}`);
        }

        // for reminder
        else if (text.includes('remind me to')) {
            let task = text.replace('remind me to ', '');
            localStorage.setItem('reminder', task);
            speak(`Okay sir, I will remind you to ${task}`);
        }

        // for speak reminder
        else if (text.includes('what is my reminder')) {
            let reminder = localStorage.getItem('reminder');
            if (reminder) {
                speak(`Your reminder is: ${reminder}`);
            } else {
                speak("You don’t have any reminders set.");
            }
        }

        // for calculation
        else if (text.includes('calculate') || text.includes('what is')) {
            
            let expression = text
                .replace('calculate ', '')
                .replace('what is ', '')
                .replace('plus', '+')
                .replace('minus', '-')
                .replace('into', '*')
                .replace('multiplied by', '*')
                .replace('x', '*')
                .replace('divide by', '/')
                .replace('divided by', '/');

            try {
                const result = evaluate(expression);
                speak(`The answer is ${result}`);
            } catch (e) {
                speak("Sorry, I could not calculate that.");
            }
        }

        resetTranscript();
        
    }

    useEffect(() => {
        if (!listening && transcript) {
            task();
        }

    }, [transcript, listening])

    return (
        <noteContext.Provider value={{
            transcript,
            listening,
            resetTranscript,
            browserSupportsSpeechRecognition
        }}>
            {children}
        </noteContext.Provider>
    )
}
