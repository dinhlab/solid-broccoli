import React, { StrictMode } from 'react'
import { Provider } from 'react-redux'
import store from './service/store'
import { createRoot } from 'react-dom/client'
import App from './App'
const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
