import { readFileSync, existsSync } from 'fs';

interface HtmlProps {
    path: string;
    themePlaceholder: 'dark' | 'light';
    localePlaceholder: 'en' | 'ru' | string;

    mountPathPlaceholder?: string;
}

const replaceAll = (str: string, find: string, replace: string) => str.replace(new RegExp(find, 'g'), replace);

export const html = ({
    themePlaceholder = 'dark',
    localePlaceholder = 'en',
    path,
    mountPathPlaceholder = '',
}: HtmlProps) => {
    if (!existsSync(path)) throw new Error(`File ${path} does not exist`);

    let htmlString = readFileSync(path, 'utf-8');

    Object.entries({
        themePlaceholder,
        localePlaceholder,
        mountPathPlaceholder,
    }).forEach(([key, value]) => {
        htmlString = replaceAll(htmlString, key, value);
    });

    return htmlString;
};
