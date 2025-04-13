import React from 'react'

export function Avatar({ src, alt }) {
    const styles = {
        img: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #ddd',
        },
    };

    return (
        <img
            style={styles.img}
            src={src}
            alt={alt}
        />
    );
}