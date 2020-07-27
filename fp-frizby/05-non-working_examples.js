const openSite = () => {
    if (currentUser) {
        return renderPage();
    } else {
        return showLogin();
    }
}

const openSite = () =>
    fromNullable(currentUser)
    .fold(showLogin, renderPage);

// ---

const getPrefs = user => {
    if (user.premium) {
        return loadPrefs(user.preferences);
    } else {
        return defaultPreferences;
    }
}

const getPrefs = user =>
    (user.premium ? Right(user) : Left('not premium'))
    .map(user => user.preferences)
    .fold(() => defaultPreferences, prefs => loadPrefs(prefs));

// ---

const streetName = user => {
    const address = user.address;
    if (address) {
        const street = address.street;
        if (street) {
            return street.name;
        }
    }
    return 'no strret';
}

const streetName = user =>
    fromNullable(street.address)
    .chain((a) => fromNullable(a.street))
    .fold(() => 'no street', s => s.name);