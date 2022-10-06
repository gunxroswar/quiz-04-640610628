import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user.isAdmin)
      return res.status(403).json({ ok: false, message: "Permission denied" });

    const users = readUsersDB();

    const customer = users.filter((x) => x.isAdmin === false);
    const admin = users.filter((x) => x.isAdmin === true);
    let money = 0;
    for (let i = 0; i < customer.length; i++) {
      money = money + customer[i].money;
    }

    //compute DB summarysdfsd
    return res.json({
      ok: true,
      userCount: customer.length,
      adminCount: admin.length,
      totalMoney: money,
    });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
