<?php

use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use App\Middlewares\CorsMiddleware;

return function (App $app)
{
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        return $response;
    });
    $app->add(CorsMiddleware::class);

    $app->group('/api', function(Group $apiGroup)
    {
        $apiGroup->group('/client', function(Group $clientGroup) 
        {
            $clientGroup->post('/login', "App\Controllers\ClientController:login");
            $clientGroup->post('/register', "App\Controllers\ClientController:register");
        });
    });
};
