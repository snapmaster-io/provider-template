// template provider service for action execution
// this provider doesn't support triggers - only actions
// to do this, it supports the /invokeAction endpoint
// 
// the HTTP POST provider has scaffolding for templates 

const { checkJwt, logRequest } = require('./requesthandler');

// define provider-specific constants
const providerName = 'template';
const entityName = `${providerName}:accounts`;
const defaultEntityName = `${entityName}:default`;

exports.createHandlers = (app) => {
  // POST handler for invokeAction  
  app.post('/invokeAction', logRequest, checkJwt, function(req, res){
    const invoke = async (payload) => {
      const result = await invokeAction(payload);
      res.status(200).send(result);
    }

    invoke(req.body);
  });
}

const invokeAction = async (request) => {
  try {
    const activeSnapId = request.activeSnapId;
    const param = request.param;
    if (!activeSnapId || !param) {
      console.error('invokeAction: missing one of activeSnapId or param in request');
      return null;
    }

    // get required parameters
    const action = param.action;
    if (!action) {
      console.error('invokeAction: missing required parameter "action"');
      return null;
    }

    // check for other required parameters that are keys of "param"
    // in this example, a required parameter is "account"

    const account = param.account;
    if (!account) {
      console.error('invokeAction: missing required parameter "account"');
      return null;
    }

    // get the correct credentials for the account (either passed explicitly, or the default)
    const accountInfo = (project === defaultEntityName) ? 
      connectionInfo :
      param[entityName];
    if (!accountInfo) {
      console.error(`invokeAction: missing required parameter ${entityName}`);
      return null;
    }

    console.log(`template provider: executing action ${action}`);

    // EXECUTE THE ACTION

    console.log(`template: finished executing action ${action}`);

    // return output
    return { status: 'success' };
  } catch (error) {
    console.log(`invokeAction: caught exception: ${error}`);
    return null;
  }
}

