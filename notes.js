const fs = require('fs')
const chalk=require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter( (note) => {
        return note.title === title
    })

    debugger

    if(duplicateNotes.length === 0){
        notes.push({
            title: title, 
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse.green('New note added'))
    } else {
        console.log(chalk.inverse.red('A note with the same title already exists'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter( (note) => {
        return note.title !== title
    })
    if(notes.length > newNotes.length){
        console.log(chalk.inverse.green('Note removed successfully! '))
        saveNotes(newNotes)
    }else{
        console.log(chalk.inverse.red('No Note Found! '))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    let retStr = ''
    notes.forEach( (note, index) => {
        retStr += ((index+1).toString() + '. ' + note.title+ '\n')
    });
    return retStr
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.filter((note)=>{
        return note.title === title
    })
    if(noteToRead.length === 0){
        console.log(chalk.inverse.red('Note not Found! '))
        return ''
    } else{
        console.log(chalk.inverse.green('Note Found! Returning Body... ')) 
        return noteToRead[0].body
    } 
    
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON=dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

const saveNotes = (noteArray) =>{
    const dataJSON = JSON.stringify(noteArray)
    fs.writeFileSync('notes.json', dataJSON)
} 



module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote


}


