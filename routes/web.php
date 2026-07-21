<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Tempo\TempoController;

// =============================================================================
// ROTAS DE API — BFF (Backend for Frontend)
// =============================================================================
// Todas as rotas prefixadas com /api/* retornam JSON e são consumidas pelo
// React SPA. O Laravel atua como proxy seguro para APIs externas e internas.
// =============================================================================
Route::prefix('api')->group(function () {

    // ── Status do BFF ─────────────────────────────────────────────────────────
    Route::get('/status', function () {
        return response()->json([
            'status'  => 'online',
            'bff'     => true,
            'php'     => PHP_VERSION,
            'laravel' => app()->version(),
        ]);
    });

    // ── Módulo: Tempo ──────────────────────────────────────────────────────────
    // Proxy BFF para a API pública Open-Meteo (sem token).
    // O React chama /api/tempo?cidade=Curitiba → BFF repassa para a API externa.
    Route::get('/tempo', [TempoController::class, 'previsao']);

});

// =============================================================================
// FALLBACK — Carrega o React SPA para qualquer rota não mapeada acima
// =============================================================================
Route::fallback(function () {
    return view('app');
});
