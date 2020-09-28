const logger = require('@log')
const { handleError } = require('@controllers/error')

exports.list = async (req, res) => {
  let route = req.route.path
  logger.info({
    message: 'List jurisdictions',
    route: route,
  })

  try {
    const data = await req.db.Jurisdiction.findAll()
    res.json(data)
  } catch (err) {
    return handleError(err, 500, res)
  }
}

exports.create = (req, res, next) => {
  req.db.Jurisdiction.create(req.body)
    .then((data) => res.json(data))
    .catch(next)
}

exports.delete = (req, res, next) => {
  req.db.Jurisdiction.destroy({
    where: { id: req.body.id },
  })
    .then((data) => res.json(data))
    .catch(next)
}

/**
 * list wip jurisidictions
 */
exports.listWip = async (req, res) => {
  let route = req.route.path
  logger.info({ message: 'List wip jurisdictions', route: route })

  try {
    const data = await req.db.WipJurisdiction.findAll()
    return res.status(201).json(data)
  } catch (err) {
    return handleError(err, 400, res)
  }
}

/**
 * list any wip locations for a given wip jurisdiction
 */
exports.listWipJurisdictionsWipLocation = async (req, res) => {
  let wipJurisdictionId = req.params.wipJurisdictionId
  if (wipJurisdictionId === null || wipJurisdictionId === undefined) {
    return handleError({ message: 'Missing required field' }, 400, res)
  }
  logger.info({
    message: 'Listing wip locations by jurisdiction',
    route: req.route.path,
    wipJurisdictionId: wipJurisdictionId,
  })

  try {
    let results = await req.db.WipLocation.findAll({
      where: { wipJurisdictionId: wipJurisdictionId },
    })
    logger.info({
      message: 'Success: Got wip location results',
      count: results.length,
      wipJurisdictionId: wipJurisdictionId,
    })
    return res.status(200).json({ status: 'ok', results: results })
  } catch (err) {
    return handleError(err, 400, res)
  }
}

/**
 * creates a WipJurisdiction entry
 */
exports.createWip = async (req, res) => {
  let data = req.body
  logger.info({
    message: 'Creating a wip jurisdiction',
    route: req.route.path,
  })

  try {
    let results = await req.db.WipJurisdiction.create(data)
    logger.info({
      message: 'Success: Created WipJurisdiction',
      results: results,
      route: req.route.path,
    })
    return res.status(201).send({ status: 'ok', results: results })
  } catch (err) {
    return handleError(err, 400, res)
  }
}

/**
 * update a wip jurisdiction
 */
exports.updateWip = async (req, res) => {
  let wipJurisdictionId = req.params.wipJurisdictionId
  if (wipJurisdictionId === undefined || wipJurisdictionId === null) {
    return handleError(
      { message: 'Missing required field: wipJurisdictionId' },
      400,
      res
    )
  }

  logger.info({
    message: 'Updating wip jurisdiction',
    route: req.route.path,
    wipJurisdictionId: wipJurisdictionId,
    updateData: { ...req.body },
  })
  try {
    let results = await req.db.WipJurisdiction.update(
      { ...req.body },
      { where: { id: wipJurisdictionId } }
    )
    logger.info({
      message: 'Success: Updated wip jurisdiction',
      wipJurisdictionId: wipJurisdictionId,
    })
    return res.status(200).send({ status: 'ok' })
  } catch (err) {
    return handleError(err, 400, res)
  }
}
