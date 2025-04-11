var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-vxXoiM/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// src/utils/cors.ts
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400"
};
function handleOptions() {
  return new Response(null, {
    headers: corsHeaders,
    status: 204
  });
}
__name(handleOptions, "handleOptions");

// src/handlers/order/order.ts
async function handleGetOrders(env) {
  try {
    const listResponse = await env.ORDERS.list();
    const orders = await Promise.all(
      listResponse.keys.map(async (key) => {
        const value = await env.ORDERS.get(key.name);
        return value ? JSON.parse(value) : null;
      })
    );
    return new Response(JSON.stringify({
      success: true,
      data: orders.filter(Boolean)
      // elimina nulos
    }), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Error al obtener las \xF3rdenes" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }
}
__name(handleGetOrders, "handleGetOrders");
async function handleGetOrderById(orderId, env) {
  try {
    const orderRaw = await env.ORDERS.get(orderId);
    if (!orderRaw) {
      return new Response(JSON.stringify({
        success: false,
        error: "Orden no encontrada"
      }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }
    const order = [JSON.parse(orderRaw)];
    return new Response(JSON.stringify({
      success: true,
      data: order
    }), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: "Error interno"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }
}
__name(handleGetOrderById, "handleGetOrderById");
async function handleCreateOrder(request, env) {
  try {
    const body = await request.json();
    const { symbol, quantity, price, orderType, notes, userId } = body;
    const id = crypto.randomUUID();
    const now = /* @__PURE__ */ new Date();
    const newOrder = {
      id,
      symbol,
      quantity,
      price,
      orderType,
      status: "PENDING",
      createdAt: now,
      updatedAt: null,
      notes: notes || null,
      userId
    };
    await env.ORDERS.put(id, JSON.stringify(newOrder));
    return new Response(JSON.stringify({ success: true, data: newOrder }), {
      status: 201,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Error al crear la orden" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
}
__name(handleCreateOrder, "handleCreateOrder");
async function handleUpdateOrder(request, env) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const orderRaw = await env.ORDERS.get(id);
    console.log(orderRaw, "orderRaw");
    if (!orderRaw) {
      return new Response(JSON.stringify({ success: false, error: "Orden no encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
    const existingOrder = JSON.parse(orderRaw);
    const updatedOrder = {
      ...existingOrder,
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    };
    console.log(updatedOrder, "updatedOrder");
    await env.ORDERS.put(id, JSON.stringify(updatedOrder));
    return new Response(JSON.stringify({ success: true, data: updatedOrder }), {
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: "Error al actualizar la orden" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
}
__name(handleUpdateOrder, "handleUpdateOrder");
async function handleDeleteOrder(orderId, env) {
  try {
    const existing = await env.ORDERS.get(orderId);
    if (!existing) {
      return new Response(JSON.stringify({ success: false, error: "Orden no encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
    await env.ORDERS.delete(orderId);
    return new Response(JSON.stringify({ success: true, message: "Orden eliminada" }), {
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Error al eliminar la orden" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
}
__name(handleDeleteOrder, "handleDeleteOrder");

// src/handlers/auth/auth.ts
async function handleLogin(request, env) {
  try {
    const { email, password } = await request.json();
    ;
    const userRaw = await env.USERS.get(email);
    if (!userRaw) {
      return new Response(JSON.stringify({ success: false, error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
    const user = JSON.parse(userRaw);
    if (user.password !== password) {
      return new Response(JSON.stringify({ success: false, error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
    const token = btoa(`${user.id}:${user.email}`);
    return new Response(JSON.stringify({
      success: true,
      data: { token, id: user.id, email: user.email, name: user.name }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
}
__name(handleLogin, "handleLogin");
async function handleRegister(request, env) {
  try {
    const { email, password, name } = await request.json();
    const existing = await env.USERS.get(email);
    if (existing) {
      return new Response(JSON.stringify({ success: false, error: "Email already in use" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
    const id = crypto.randomUUID();
    const newUser = { id, email, password, name };
    console.log(newUser, "newUser");
    await env.USERS.put(email, JSON.stringify(newUser));
    console.log("entra");
    return new Response(JSON.stringify({ success: true, data: { id, email, name } }), {
      status: 201,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
}
__name(handleRegister, "handleRegister");

// src/index.ts
var src_default = {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return handleOptions();
    }
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === "/api/debug-users") {
      const list = await env.USERS.list();
      return new Response(JSON.stringify(list.keys, null, 2), {
        headers: { "Content-Type": "application/json" }
      });
    }
    if (path === "/api/debug-orders") {
      const list = await env.ORDERS.list();
      return new Response(JSON.stringify(list.keys, null, 2), {
        headers: { "Content-Type": "application/json" }
      });
    }
    if (path === "/api/orders") {
      if (request.method === "GET") {
        return handleGetOrders(env);
      }
      if (request.method === "POST") {
        return handleCreateOrder(request, env);
      }
      if (request.method === "PUT") {
        return handleUpdateOrder(request, env);
      }
      if (request.method === "DELETE") {
        const body = await request.json();
        const orderId = body.orderId;
        return handleDeleteOrder(orderId, env);
      }
    }
    if (path.match(/^\/api\/orders\/[\w-]+$/)) {
      const orderId = path.split("/").pop();
      if (request.method === "GET") {
        return handleGetOrderById(orderId, env);
      }
      if (request.method === "PUT") {
        return handleUpdateOrder(request, env);
      }
      if (request.method === "DELETE") {
        return handleDeleteOrder(orderId, env);
      }
    }
    if (path === "/api/login" && request.method === "POST") {
      return handleLogin(request, env);
    }
    if (path === "/api/register" && request.method === "POST") {
      return handleRegister(request, env);
    }
    return new Response(JSON.stringify({
      success: false,
      error: "Endpoint no encontrado"
    }), {
      status: 404,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-vxXoiM/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-vxXoiM/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
