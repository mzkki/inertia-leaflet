<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $mark = Project::all();
        return Inertia::render(
            'Dashboard',
            ['mark' => $mark]
        );
    }
}
