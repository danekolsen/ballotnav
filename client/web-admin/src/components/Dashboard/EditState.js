import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AutoForm from './AutoForm'
import model from 'models/state'
import TabPanel from './TabPanel'
import { Tabs, Tab, List, ListItem, ListItemText } from '@material-ui/core'
import { useHeader } from './Layout'
import api from 'services/api'

function EditState() {
  const { id } = useParams()
  const [state, setState] = useState(null)
  const [tabNum, setTabNum] = useState(0)
  const { setTitle } = useHeader()
  const history = useHistory()

  useEffect(() => {
    api.states.getById(id).then((state) => {
      setTitle(`Editing state: ${state.name}`)
      setState(state)
    })
  }, [id, setTitle])

  if (!state) return null
  return (
    <>
      <Tabs value={tabNum} onChange={(event, newValue) => setTabNum(newValue)}>
        <Tab label="State Details" />
        <Tab label="Jurisdictions" />
      </Tabs>
      <TabPanel value={tabNum} index={0}>
        <AutoForm
          model={model}
          initialValues={null}
          submitText="Update State"
          onSubmit={(values, funcs) => {
            console.log(values)
            funcs.setSubmitting(false)
          }}
          style={{ maxWidth: 400 }}
        />
      </TabPanel>
      <TabPanel value={tabNum} index={1}>
        <List>
          {state.jurisdictions.map((juris) => (
            <ListItem
              key={juris.id}
              button
              onClick={() => history.push(`/jurisdictions/${juris.id}`)}
            >
              <ListItemText primary={juris.name} />
            </ListItem>
          ))}
        </List>
      </TabPanel>
    </>
  )
}

export default EditState
