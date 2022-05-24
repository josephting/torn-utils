import { Button, Link, TextField } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const saveApiKey = (key: string) => {
  window.localStorage.setItem('apiKey', key)
}

const loadApiKey = () => {
  return window.localStorage.getItem('apiKey') || ''
}

const isApiKeyValid = async (key: string) => {
  return fetch(`https://api.torn.com/torn/?key=${key}`)
    .then((resp) => resp.json())
    .then(
      (data) =>
        !(
          Object.prototype.hasOwnProperty.call(data, 'error') &&
          data.error.code === 2
        ),
    )
    .catch(() => false)
}

const User: NextPage = () => {
  const [apiKey, setApiKey] = useState<string>('')

  useEffect(() => {
    setApiKey(loadApiKey())
  }, [])

  const saveSettings = async () => {
    if (await isApiKeyValid(apiKey)) {
      console.log(apiKey)
      saveApiKey(apiKey)
    }
  }

  return (
    <>
      <h1>User Settings</h1>
      <TextField
        id="apiKey"
        label="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.currentTarget.value)}
      />
      <p>
        {/* <Link href="https://www.torn.com/preferences.php#tab=api?&step=addNewKey&title=torn-utils&type=1" target="_blank" rel="noreferrer"> */}
        <Link href="https://www.google.com" target="_blank" rel="noreferrer">
          Create a new Public Only key
        </Link>
      </p>
      <Button variant="contained" onClick={saveSettings}>
        Save
      </Button>
    </>
  )
}

export default User
