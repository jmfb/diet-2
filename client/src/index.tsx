import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import PageLoading from '~/components/PageLoading';
import ErrorBoundary from '~/containers/ErrorBoundary';
import { createStore } from '~/redux';
import './index.css';

const asyncSignInContainer = lazy(() =>
	import(/* webpackChunkName: 'SignInContainer' */ '~/containers/SignInContainer'));
const asyncAuthenticateContainer = lazy(() =>
	import(/* webpackChunkName: 'AuthenticateContainer' */ '~/containers/AuthenticateContainer'));
const asyncApplicationContainer = lazy(() =>
	import(/* webpackChunkName: 'ApplicationContainer' */ '~/containers/ApplicationContainer'));

function start() {
	const store = createStore();
	const rootContainer = document.getElementById('root');
	const rootElement =
		<Provider {...{store}}>
			<BrowserRouter>
				<ErrorBoundary>
					<Suspense fallback={<PageLoading />}>
						<Switch>
							<Route path='/sign-in' component={asyncSignInContainer} />
							<Route path='/authenticate' component={asyncAuthenticateContainer} />
							<Route path='/' component={asyncApplicationContainer} />
						</Switch>
					</Suspense>
				</ErrorBoundary>
			</BrowserRouter>
		</Provider>;
	ReactDOM.render(rootElement, rootContainer);
}

start();
