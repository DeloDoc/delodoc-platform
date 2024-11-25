import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { routes } from '../../../server/contract/routes';

import { protectedElement, publicElement } from './route';

const LazyIndex = lazy(() => import('../index'));

const LazyBootstrap = lazy(() => import('../auth/bootstrap'));
const LazySignup = lazy(() => import('../auth/signup'));
const LazySignin = lazy(() => import('../auth/signin'));

const LazyUserSettings = lazy(() => import('../users/settings'));

const LazyPosts = lazy(() => import('../posts'));

const LazyTags = lazy(() => import('../tags'));
const LazyTagsId = lazy(() => import('../tags/[id]'));
const LazyTagsNew = lazy(() => import('../tags/new'));

const LazyError = lazy(() => import('../error'));

const errorElement = <LazyError />;

export const schema = createBrowserRouter([
    {
        path: routes.userSettings(),
        element: protectedElement(<LazyUserSettings />),
        errorElement,
    },
    {
        path: routes.index(),
        element: protectedElement(<LazyIndex />),
        errorElement,
    },
    {
        path: routes.posts(),
        element: protectedElement(<LazyPosts />),
        errorElement,
    },
    {
        path: routes.tags(),
        element: protectedElement(<LazyTags />),
        errorElement,
    },
    {
        path: routes.tagsId(':id'),
        element: protectedElement(<LazyTagsId />),
        errorElement,
    },
    {
        path: routes.tagsNew(),
        element: protectedElement(<LazyTagsNew />),
        errorElement,
    },
    {
        path: routes.authBootstrap(),
        element: publicElement(<LazyBootstrap />),
    },
    {
        path: routes.authSignup(),
        element: publicElement(<LazySignup />),
    },
    {
        path: routes.authSignin(),
        element: publicElement(<LazySignin />),
    },
]);
