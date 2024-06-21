<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request...
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'position' => 'required',
        ]);

        $latitude = explode(',', $request->position)[0];
        $longitude = explode(',', $request->position)[1];

        Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'latitude' => $latitude,
            'longitude' => $longitude,
        ]);

        return redirect()->route('dashboard');
    }
}
