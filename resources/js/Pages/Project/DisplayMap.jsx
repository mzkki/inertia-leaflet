import SecondaryButton from "@/Components/SecondaryButton";
import { useState, useCallback, useEffect } from "react";
export default function DisplayMap({
    map,
    center,
    zoom,
    setData: setDataPosition,
}) {
    const [position, setPosition] = useState(() => map.getCenter());

    const onClick = useCallback(() => {
        map.setView(center, zoom);
    }, [map]);

    const onMove = useCallback(() => {
        const position = map.getCenter();
        setPosition(position);
        setDataPosition("position", [position.lat, position.lng]);
    }, [map]);

    useEffect(() => {
        map.on("move", onMove);
        return () => {
            map.off("move", onMove);
        };
    }, [map, onMove]);

    return (
        <p className="my-2">
            latitude: {position.lat.toFixed(4)}, longitude:{" "}
            {position.lng.toFixed(4)}{" "}
            <SecondaryButton onClick={onClick} type="button">
                reset
            </SecondaryButton>
        </p>
    );
}
