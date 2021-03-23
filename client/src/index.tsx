import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ChunkLoading from '~/components/ChunkLoading';
import ErrorBoundary from '~/containers/ErrorBoundary';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '~/reducers/rootReducer';
import './index.scss';

const asyncLoginContainer = lazy(() =>
	import(/* webpackChunkName: 'LoginContainer' */ '~/containers/LoginContainer'));
const asyncAuthenticateContainer = lazy(() =>
	import(/* webpackChunkName: 'AuthenticateContainer' */ '~/containers/AuthenticateContainer'));
const asyncApplicationContainer = lazy(() =>
	import(/* webpackChunkName: 'ApplicationContainer' */ '~/containers/ApplicationContainer'));

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, middleware);

ReactDOM.render(
	<Provider {...{store}}>
		<BrowserRouter>
			<ErrorBoundary>
				<Suspense fallback={<ChunkLoading />}>
					<Switch>
						<Route path='/login' component={asyncLoginContainer} />
						<Route path='/authenticate' component={asyncAuthenticateContainer} />
						<Route path='/' component={asyncApplicationContainer} />
					</Switch>
				</Suspense>
			</ErrorBoundary>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
