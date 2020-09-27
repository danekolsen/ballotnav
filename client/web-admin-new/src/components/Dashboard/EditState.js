import React from 'react'
//import { useParams } from 'react-router-dom'
import AutoForm from './AutoForm'
import model from 'models/state'

function EditState() {
  return (
    <AutoForm
      model={model}
      initialValues={null}
      onSubmit={(values, funcs) => {
        console.log(values)
        funcs.setSubmitting(false)
      }}
      style={{ maxWidth: 400 }}
    />
  )
}

export default EditState