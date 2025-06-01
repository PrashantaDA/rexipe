import { useState, useCallback } from "react";

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const useApi = (endpoint, options = {}) => {
	const { cacheKey, cacheDuration = CACHE_DURATION, initialData = null, transformData = (data) => data } = options;

	const [data, setData] = useState(initialData);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const isCacheValid = useCallback(
		(key) => {
			if (!key) return false;
			const timestamp = localStorage.getItem(`${key}_timestamp`);
			if (!timestamp) return false;
			return Date.now() - parseInt(timestamp) < cacheDuration;
		},
		[cacheDuration]
	);

	const getCachedData = useCallback((key) => {
		if (!key) return null;
		try {
			const cachedData = localStorage.getItem(key);
			return cachedData ? JSON.parse(cachedData) : null;
		} catch (err) {
			console.error("Error reading cache:", err);
			return null;
		}
	}, []);

	const setCachedData = useCallback((key, data) => {
		if (!key) return;
		try {
			localStorage.setItem(key, JSON.stringify(data));
			localStorage.setItem(`${key}_timestamp`, Date.now().toString());
		} catch (err) {
			console.error("Error caching data:", err);
		}
	}, []);

	const clearCache = useCallback((key) => {
		if (!key) return;
		try {
			localStorage.removeItem(key);
			localStorage.removeItem(`${key}_timestamp`);
		} catch (err) {
			console.error("Error clearing cache:", err);
		}
	}, []);

	const fetchData = useCallback(
		async (params = {}, forceRefresh = false) => {
			try {
				setIsLoading(true);
				setError(null);

				// Check cache if not forcing refresh
				if (!forceRefresh && cacheKey && isCacheValid(cacheKey)) {
					const cachedData = getCachedData(cacheKey);
					if (cachedData) {
						setData(transformData(cachedData));
						setIsLoading(false);
						return cachedData;
					}
				}

				// Build URL with params
				const queryParams = new URLSearchParams({
					apiKey: import.meta.env.VITE_API_KEY,
					...params,
				}).toString();

				const url = `${endpoint}?${queryParams}`;
				const response = await fetch(url);

				if (!response.ok) {
					const errorData = await response.json().catch(() => ({}));
					throw new Error(errorData.message || "Failed to fetch data");
				}

				const responseData = await response.json();
				const transformedData = transformData(responseData);

				// Cache the data if cacheKey is provided
				if (cacheKey) {
					setCachedData(cacheKey, responseData);
				}

				setData(transformedData);
				return transformedData;
			} catch (err) {
				console.error("API Error:", err);
				setError(err.message);

				// If there's an error and we have cached data, use it as fallback
				if (cacheKey) {
					const cachedData = getCachedData(cacheKey);
					if (cachedData) {
						setData(transformData(cachedData));
						return cachedData;
					}
				}

				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[endpoint, cacheKey, isCacheValid, getCachedData, setCachedData, transformData]
	);

	return {
		data,
		isLoading,
		error,
		fetchData,
		clearCache: cacheKey ? () => clearCache(cacheKey) : undefined,
	};
};

export default useApi;
