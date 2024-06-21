import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Dashboard({ auth, mark }) {
    const legalIcon = new Icon({
        iconUrl: "markerIcon.svg",
        iconSize: [30, 30], // size of the icon
        iconAnchor: null, // point of the icon which will correspond to marker's location
        className: "animate-pulse",
    });
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                        <MapContainer
                            center={[-1.2509472245738202, 116.852288735986]}
                            zoom={5}
                            style={{ height: "400px" }}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {mark.map((m, index) => (
                                <Marker
                                    key={index}
                                    position={[m.latitude, m.longitude]}
                                    icon={legalIcon}
                                >
                                    <Popup>
                                        <div>
                                            <h3>{m.name}</h3>
                                            <p>{m.description}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
