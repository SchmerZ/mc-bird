const createRouterAction = (ControllerClass, actionName, config) => {
  if (typeof actionName === 'function') {
    actionName = actionName.name;
  }

  return (req, res, next) => {
    const controllerInstance = new ControllerClass(req, res, next, config);

    if (typeof controllerInstance[actionName] !== 'function') {
      throw new Error(`Action ${actionName} is not defined as a method of controller.`);
    }

    const result = controllerInstance[actionName].call(controllerInstance);

    if (result && result.then && typeof result.then === 'function') {
      result
        .catch(error => {
          if (error instanceof Error) throw error;

          controllerInstance.handleError(error);

          return error;
        })
        .then(response => {
          controllerInstance.end(response);
        })
        .catch(error => {
          next(error);
        });
    }
    else {
      throw Error(`Controller method ${actionName} should return a promise.`);
    }
  }
};

export default createRouterAction;
