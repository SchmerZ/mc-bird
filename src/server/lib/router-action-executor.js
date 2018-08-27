const createRouterAction = (controllerInstance, actionName) => {
  if (typeof actionName === 'function') {
    actionName = actionName.name;
  }

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
        controllerInstance.next(error);
      });
  }
  else {
    throw Error(`Controller method ${actionName} should return a promise.`);
  }
};

export default createRouterAction;
