import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'
import { MeetingProvider } from 'views/app-views/apps/MeetingContext'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'login-1',
        path: `${AUTH_PREFIX_PATH}/login-1`,
        component: React.lazy(() => import('views/auth-views/authentication/login-1')),
    },
    {
        key: 'login-2',
        path: `${AUTH_PREFIX_PATH}/login-2`,
        component: React.lazy(() => import('views/auth-views/authentication/login-2')),
    },
    {
        key: 'register-1',
        path: `${AUTH_PREFIX_PATH}/register-1`,
        component: React.lazy(() => import('views/auth-views/authentication/register-1')),
    },

    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    },
    {
        key: 'error-page-1',
        path: `${AUTH_PREFIX_PATH}/error-page-1`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-1')),
    },
    {
        key: 'error-page-2',
        path: `${AUTH_PREFIX_PATH}/error-page-2`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-2')),
    },
]

export const protectedRoutes = [
    {
        key: 'dashboard.default',
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        component: React.lazy(() => import('views/app-views/dashboards/default')),
    },
    {
        key: 'dashboard.analytic',
        path: `${APP_PREFIX_PATH}/dashboards/analytic`,
        component: React.lazy(() => import('views/app-views/dashboards/analytic')),
    },
    {
        key: 'dashboard.sales',
        path: `${APP_PREFIX_PATH}/dashboards/sales`,
        component: React.lazy(() => import('views/app-views/dashboards/sales')),
    },
    {
        key: 'apps',
        path: `${APP_PREFIX_PATH}/apps`,
        component: React.lazy(() => import('views/app-views/apps')),
    },
    {
        key: 'apps.mail',
        path: `${APP_PREFIX_PATH}/apps/mail/*`,
        component: React.lazy(() => import('views/app-views/apps/mail')),
    },
    {
        key: 'apps.chat',
        path: `${APP_PREFIX_PATH}/apps/chat/*`,
        component: React.lazy(() => import('views/app-views/apps/chat')),
    },
    {
        key: 'apps.calendar',
        path: `${APP_PREFIX_PATH}/apps/calendar`,
        component: React.lazy(() =>
            import('views/app-views/apps/calendar').then(mod => {
                const CalendarApp = mod.default
                return {
                    default: () => (
                        <MeetingProvider>
                            <CalendarApp />
                        </MeetingProvider>
                    )
                }
            })
        ),
    },
    {
        key: 'apps.meeting.list',
        path: `${APP_PREFIX_PATH}/apps/meetings/list`,
        component: React.lazy(() =>
            import('views/app-views/apps/meetings/meeeting-list').then(mod => {
                const MeetingList = mod.default
                return {
                    default: () => (
                        <MeetingProvider>
                            <MeetingList />
                        </MeetingProvider>
                    )
                }
            })
        ),
    },
    {
        key: 'apps.meeting.details',
        path: `${APP_PREFIX_PATH}/apps/meetings/details/:id`,
        component: React.lazy(() =>
            import('views/app-views/apps/meetings/MeetingDetails').then(mod => {
                const MeetingDetails = mod.default
                return {
                    default: () => (
                        <MeetingProvider>
                            <MeetingDetails />
                        </MeetingProvider>
                    )
                }
            })
        ),
    },
    {
        key: 'apps.project.list',
        path: `${APP_PREFIX_PATH}/apps/meetings/list`,
        component: React.lazy(() => import('views/app-views/apps/meetings/meeeting-list')),
    },
    {
        key: 'apps.project.scrumboard',
        path: `${APP_PREFIX_PATH}/apps/project/scrumboard`,
        component: React.lazy(() => import('views/app-views/apps/meetings/scrumboard')),
    },
    {
        key: 'apps.ecommerce',
        path: `${APP_PREFIX_PATH}/apps/ecommerce`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce')),
    },
    {
        key: 'apps.ecommerce.add-product',
        path: `${APP_PREFIX_PATH}/apps/ecommerce/add-product`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce/add-product')),
    },
    {
        key: 'apps.ecommerce.edit-product',
        path: `${APP_PREFIX_PATH}/apps/ecommerce/edit-product/:id`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce/edit-product')),
    },
    {
        key: 'apps.ecommerce.product-list',
        path: `${APP_PREFIX_PATH}/apps/ecommerce/product-list`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce/product-list')),
    },


]