// const base = process.env.MOUNT_PATH || '';
const base = '';

export const routes = {
    index: (b = base) => `${b}/~`,

    authSignin: (b = base) => `${b}/auth/signin`,
    authSignup: (b = base) => `${b}/auth/signup`,
    authBootstrap: (b = base) => `${b}/auth/bootstrap`,

    userSettings: (b = base) => `${b}/settings`,

    posts: (b = base) => `${b}/posts`,

    tags: (b = base) => `${b}/tags`,
    tagsNew: (b = base) => `${b}/tags/new`,
    tagsId: (id: number | string, b = base) => `${b}/tags/${id}`,

    api: (b = base) => `${b}/api`,
    apiAuthRefresh: (b = base) => `${b}/api/auth.refresh`,

    docs: () => '/docs',
    releases: () => '/releases',
    slack: () => '/slack',
};
