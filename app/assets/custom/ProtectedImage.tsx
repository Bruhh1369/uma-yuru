import Image from "next/image"
import './ProtectedImage.css'

interface ProtectedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    className?: string;
}

const ProtectedImage = ({src, alt, width, height, fill, sizes, priority, className}: ProtectedImageProps) => {
    return (
        <div className={`protected-image ${className}`}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                fill={fill}
                sizes={sizes}
                priority={priority}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
                onDragStart={e => e.preventDefault()}
                style={{
                    userSelect: 'none',
                    pointerEvents: 'auto',
                    WebkitTouchCallout: 'none'
                }}
            />
            <div className="protected-image-overlay"></div>
        </div>
    )
}

export default ProtectedImage