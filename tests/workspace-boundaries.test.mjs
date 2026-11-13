import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));

async function readAppRoutes(app) {
  const manifestPath = join(
    repositoryRoot,
    "apps",
    app,
    ".next",
    "server",
    "app-paths-manifest.json",
  );
  return JSON.parse(await readFile(manifestPath, "utf8"));
}

test("customer production output contains no admin routes", async () => {
  const routes = Object.keys(await readAppRoutes("customer"));

  assert.ok(routes.includes("/page"));
  assert.ok(routes.includes("/menu/page"));
  assert.ok(routes.includes("/api/v1/menu/route"));
  assert.ok(
    routes.every((route) => !/(?:^|\/)(?:dashboard|admin)(?:\/|$)/i.test(route)),
  );
});

test("admin dashboard is built only by the admin app", async () => {
  const customerRoutes = Object.keys(await readAppRoutes("customer"));
  const adminRoutes = Object.keys(await readAppRoutes("admin"));

  assert.ok(adminRoutes.includes("/dashboard/page"));
  assert.ok(!customerRoutes.includes("/dashboard/page"));
});

test("customer shell does not mount admin runtime", async () => {
  const layout = await readFile(
    join(repositoryRoot, "apps", "customer", "src", "app", "layout.tsx"),
    "utf8",
  );

  assert.doesNotMatch(layout, /\bAdmin(?:Provider|Context|Dashboard)\b/);
});

test("customer checkout preserves Messenger and delivery-partner handoffs", async () => {
  const orderDrawer = await readFile(
    join(repositoryRoot, "apps", "customer", "src", "components", "order", "OrderDrawer.tsx"),
    "utf8",
  );

  assert.match(orderDrawer, /STORE_INFO\.messengerUrl/);
  assert.match(orderDrawer, /window\.open\(messengerUrl,\s*"_blank"\)/);
  assert.match(orderDrawer, /openDeliveryModal/);
});
