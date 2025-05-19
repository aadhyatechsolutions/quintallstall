<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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

        Mail::to(env('CONTACT_MAIL_RECEIVER'))->send(new \App\Mail\ContactMail($validated));

        return back()->with('success', 'Message sent successfully!');
    }
}
