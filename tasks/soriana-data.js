// node tasks/soriana-data --file <file>
require('../config')
require('lib/databases/mongo')

const Task = require('lib/task')
const Models = require('models')
const fs = require('fs')
const _ = require('lodash')
const parse = require('csv-parse/lib/sync')

var argv = require('minimist')(process.argv.slice(2))

const task = new Task(async function (argv) {
  if (!argv.file) {
    throw new Error('A JSON file with the data is required!')
  }

  console.log('Starting ....')

  let data = []

  try {
    console.log('Loading data from file ....')
    const saveFile = fs.readFileSync(
      argv.file,
      'utf8'
    )
    console.log('saveFile', saveFile)
    data = parse(saveFile, {
      columns: true,
      delimiter: '|',
      max_limit_on_data_read: 1028000000000,
      skip_lines_with_error: true,
      skip_empty_lines: true,
      skip_lines_with_empty_values: true
    })

    console.log('data', data)
  } catch (e) {
    console.log('=========================================================')
    console.log('Error when fetching data from Disk ' + e)
    console.log('=========================================================')

    return
  }

  let createdItems = 0
  let existingItems = 0
  let errors = 0
})

if (require.main === module) {
  task.setCliHandlers()
  task.run()
} else {
  module.exports = task
}
