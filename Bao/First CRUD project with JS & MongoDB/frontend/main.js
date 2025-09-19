const navInjector = async () => {
    const response = await fetch('/nav.partial.html');
    const navHtml = await response.text();
    document.querySelector('#nav-placeholder').innerHTML = navHtml;
};
navInjector();