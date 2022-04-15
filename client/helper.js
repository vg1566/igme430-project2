// exports: sendPost,

// update error message text and display it
const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorBox').classList.remove('hidden');
};

const hideError = () => {
    document.getElementById('errorBox').classList.add('hidden');
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
    document.getElementById('errorBox').classList.add('hidden');
  
    if(result.error) {
      handleError(result.error);
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
    hideError,
    sendPost,
};