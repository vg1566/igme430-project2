// exports: sendPost,

// update error message text and display it
const handleError = (message) => {
  if(!document.getElementById('errorMessage')) return;
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorBox').classList.remove('hidden');
};

// update normal message text and display it
const handleMessage = (message) => {
  if(!document.getElementById('normalMessage')) return;
  document.getElementById('normalMessage').textContent = message;
  document.getElementById('normalMessageBox').classList.remove('hidden');
};

const hideError = () => {
    document.getElementById('errorBox').classList.add('hidden');
    if(document.getElementById('normalMessageBox')) document.getElementById('normalMessageBox').classList.add('hidden');
};

const sendPost = async (url, data, handler) => {

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  hideError();

  if(result.error) {
    handleError(result.error);
  }

  if(result.message) {
    handleMessage(result.message);
  }

  if(result.redirect) {
    window.location = result.redirect;
  }

  if(handler) {
      handler(result);
  }
};


module.exports = {
    handleError,
    handleMessage,
    hideError,
    sendPost,
};