<?php

namespace App\Http\Controllers;

use App\Models\Session;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\PersonalAccessTokenResult;
use Laravel\Passport\Token;
use Laravel\Sanctum\PersonalAccessToken as SanctumToken;

class SessionController extends Controller
{
    /**
     * Fetch all active sessions (tokens) for the authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
        $user = Auth::user();
        $sessions = Session::where('user_id', $user->id)->get();
        // $sessions = $user->tokens;
        return response()->json($sessions);
    }

    /**
     * Logout from a specific session by revoking a token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $tokenId
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request, $sessionId)
    {
        $session = Session::find($sessionId);
    
        if ($session) {
            $session->delete();
        }

        $user = Auth::user();

        if ($user) {
            $token = SanctumToken::find($session->token_id);
            if ($token) {
                $token->delete();

                return response()->json(['message' => 'Session logged out successfully.']);
            }
        }

        return response()->json(['message' => 'Session not found.'], 404);
    }
}

