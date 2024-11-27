// const base = process.env.MOUNT_PATH || '';
const base = '';

export const routes = {
    index: (b = base) => `${b}/~`,

    authSignin: () => `${base}/auth/signin`,
    authSignup: () => `${base}/auth/signup`,
    authBootstrap: () => `${base}/auth/bootstrap`,

    userSettings: () => `${base}/settings`,

    posts: () => `${base}/posts`,

    tags: () => `${base}/tags`,
    tagsNew: () => `${base}/tags/new`,
    tagsId: (id: number | string) => `${base}/tags/${id}`,

    api: () => `${base}/api`,
    apiAuthRefresh: () => `${base}/api/auth.refresh`,

    docs: () => '/docs',
    releases: () => '/releases',
    slack: () => '/slack',
};
