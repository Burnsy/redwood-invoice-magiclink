import ReactDOM from 'react-dom'
import { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web'
import { AuthProvider } from '@redwoodjs/auth'
import { Magic } from 'magic-sdk'

import Routes from './Routes'
import './index.css'

const m = new Magic(process.env.MAGICLINK_PUBLIC)

ReactDOM.render(
  <AuthProvider client={m} type="magicLinks">
    <RedwoodProvider>
      <Routes />
    </RedwoodProvider>
  </AuthProvider>,
  document.getElementById('redwood-app')
)
