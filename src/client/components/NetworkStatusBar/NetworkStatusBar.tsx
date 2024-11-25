import s from './NetworkStatusBar.module.scss';

interface NetworkStatusBarProps {
    global?: boolean;
    remote?: boolean;
}

export default ({ global, remote }: NetworkStatusBarProps) => {
    const message: string[] = [];

    if (global) {
        message.push('No internet connection.');
    }

    if (remote) {
        message.push('No remote connection.');
    }

    return <div className={s.NetworkStatusBar}>{message.join(' ')}</div>;
};
