<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;

class ClientController
{
    public function login(Request $request, Response $response, $args)
    {
        $body = $request->getParsedBody();
        $login = $body['login'];
        $password = $body['password'];

        if ($login != $_ENV["ADMIN_LOGIN"] || $password != $_ENV["ADMIN_PASSWORD"])
        {
            $result['state'] = "Unknown login and password combination.";
            return $response->withStatus(401)->withHeader("Content-Type", "application/json");
        }

        $token_creation_time = time();

        $token = JWT::encode($payload, $_ENV["JWT_SECRET"], "HS256");

        $payload = [
            "user" => [
                "login" => $_ENV["ADMIN_ID"],
            ],
            "iat" => $token_creation_time,
            "exp" => $token_creation_time + 60,
        ];

        return $response
            ->withHeader("Access-Control-Expose-Headers", "*")
            ->withHeader("Authorization", $token)
            ->withHeader("Content-Type", "application/json")
            ->withStatus(200);
    }

    public function register(Request $request, Response $response, $args)
    {
        $body = $request->getParsedBody();
        
        $response->getBody()->write(json_encode($body['account']));
        return $response->withStatus(201)->withHeader("Content-Type", "application/json");
    }
}