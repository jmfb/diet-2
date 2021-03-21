import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { /*Route,*/ Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Application from './Application';
import rootReducer from '~/reducers/rootReducer';
// import ChunkLoading from '~/components/ChunkLoading';
// import * as Loadable from 'react-loadable';
import './index.scss';

// import LoginContainer from './containers/LoginContainer';
// import AuthenticateContainer from './containers/AuthenticateContainer';
// import ErrorContainer from './containers/ErrorContainer';
// import ApplicationContainer from './containers/ApplicationContainer';
					// <Route path='/login' component={LoginContainer} />
					// <Route path='/authenticate' component={AuthenticateContainer} />
					// <Route path='/error' component={ErrorContainer} />
					// <Route path='/' component={ApplicationContainer} />

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, middleware);

ReactDOM.render(
	<Provider {...{store}}>
		<BrowserRouter>
			<Application>
				<Switch>
				</Switch>
			</Application>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
