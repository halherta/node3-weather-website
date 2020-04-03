//const fs = require('fs') 
//const getNotes = require('./notes.js')

//fs.writeFileSync('notes.txt', 'Welcome@')
//fs.appendFileSync('notes.txt', 'second greeting')

//getNotes('notes.txt')

const chalk = require('chalk')
const  yargs = require('yargs')
const  notes =  require('./notes')

yargs.version('1.1.0')


yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: ' Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: ' Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title:{
            describe: ' Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title)
    }
})

yargs.command({ 
    command: 'list',
    describe: 'List all notes',
    handler: function(){
       console.log(notes.listNotes())
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title:{
            describe: ' Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        console.log(notes.readNote(argv.title))
    }
})



yargs.parse()