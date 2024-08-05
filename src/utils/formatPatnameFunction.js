export const formatPathname = pathname => {
    if (pathname.endsWith("/")) {
        return pathname.slice(0, -1);
    }
    return pathname;
}
