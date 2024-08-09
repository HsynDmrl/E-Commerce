import React, { useEffect } from 'react';

const CsvDownloader = ({ csvData, fileName, onDownloadComplete }) => {
    useEffect(() => {
        if (csvData) {
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            onDownloadComplete();
        }
    }, [csvData, fileName, onDownloadComplete]);

    return null;
};

export default CsvDownloader;
