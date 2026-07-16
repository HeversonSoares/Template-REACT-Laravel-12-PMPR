<?php

use Illuminate\Support\Facades\Route;

// BFF Status Route
Route::get('/api/status', function () {
    return response()->json([
        'status' => 'online',
        'bff' => true,
        'php' => PHP_VERSION,
        'laravel' => app()->version(),
    ]);
});

// Fallback to load React SPA
Route::fallback(function () {
    return view('app');
});
