<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log; 

class ContactUsController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);
        Log::info('Sending mail to: ' . env('CONTACT_MAIL_RECEIVER')); 
        Mail::to("mayur@aadhyatechsolution.com")->send(new \App\Mail\ContactMail($validated));
        

        return response()->json([
            'message' => 'Message sent successfully!',
            'success' => true
        ], 200);
    }
}
