import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Create({ auth }) {
    const center = [-1.2509472245738202, 116.852288735986];
    const zoom = 5;
    const [position, setPosition] = useState({
        lat: center[0],
        lng: center[1],
    });
    const markerRef = useRef(null);
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            description: "",
            position: "",
        });

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        []
    );

    useEffect(() => {
        setData("position", position.lat + "," + position.lng);
    }, [position]);

    const submit = (e) => {
        e.preventDefault();
        post(route("project.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setData("name", "");
                setData("description", "");
                alert("Project created successfully");
            },
            onError: (error) => {
                alert("Failed to create project");
                console.log(error);
            },
        });
    };

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
                            <h2 className="mb-4">Form Tambah Project</h2>
                            <form className="space-y-5" onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="decription"
                                        value="decription"
                                    />

                                    <TextInput
                                        id="decription"
                                        className="mt-1 block w-full"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        isFocused
                                        autoComplete="description"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="position"
                                        value="Position"
                                    />

                                    <TextInput
                                        id="position"
                                        className="mt-1 block w-full"
                                        value={data.position}
                                        onChange={(e) =>
                                            setData("position", e.target.value)
                                        }
                                        isFocused
                                        autoComplete="position"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>
                                <div>
                                    <MapContainer
                                        center={center}
                                        zoom={zoom}
                                        style={{ height: "400px" }}
                                        className="rounded-md "
                                        scrollWheelZoom={true}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />{" "}
                                        <Marker
                                            draggable={true}
                                            eventHandlers={eventHandlers}
                                            position={position}
                                            ref={markerRef}
                                        >
                                            <Popup minWidth={90}>
                                                <span>
                                                    {`latitude: ${position.lat}, longitude: ${position.lng}`}
                                                </span>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Save
                                    </PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
