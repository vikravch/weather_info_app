import { useEffect, useState } from 'react';

interface Location {
    latitude: number;
    longitude: number;
}

interface LocationError {
    code: number;
    message: string;
}

export const useUserLocation = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<LocationError | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [permission, setPermission] = useState<PermissionState | null>(null);

    useEffect(() => {
        const getLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setLoading(false);
                },
                (err) => {
                    setError({ code: err.code, message: err.message });
                    setLoading(false);
                }
            );
        };

        if (!navigator.geolocation) {
            setError({ code: 0, message: 'Geolocation is not supported by your browser' });
            setLoading(false);
            return;
        }

        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                setPermission(result.state);
                if (result.state === 'granted' || result.state === 'prompt') {
                    getLocation();
                } else {
                    setError({ code: 1, message: 'Location access denied' });
                    setLoading(false);
                }

                // Listen for changes in permission state
                result.onchange = () => setPermission(result.state);
            }).catch(() => {
                // Permissions API may fail or not be supported
                getLocation();
            });
        } else {
            // Fallback: just try to get location
            getLocation();
        }
    }, []);

    return { location, error, loading, permission };
};
