(function () {
    var q = true,
        t = false,
        aa = window,
        u = undefined,
        ba = String,
        w = Math,
        ca = "push",
        ea = "cookie",
        x = "charAt",
        z = "indexOf",
        fa = "gaGlobal",
        ga = "getTime",
        ha = "toString",
        A = "window",
        B = "length",
        C = "document",
        D = "split",
        E = "location",
        ia = "href",
        F = "substring",
        H = "join",
        I = "toLowerCase";
    var ja = "_gat",
        ka = "_gaq",
        la = "4.8.9",
        na = "_gaUserPrefs",
        oa = "ioo",
        K = "&",
        L = "=",
        N = "__utma=",
        pa = "__utmb=",
        qa = "__utmc=",
        ra = "__utmk=",
        sa = "__utmv=",
        ta = "__utmz=",
        ua = "__utmx=",
        va = "GASO=";
    var wa = function () {
        var k = this,
            l = [],
            g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        k.Dc = function (m) {
            l[m] = q
            console.log(l);
        };
        k.Vb = function () {
            for (var m = [], j = 0; j < l[B]; j++) if (l[j]) m[w.floor(j / 6)] ^= 1 << j % 6;
            for (j = 0; j < m[B]; j++) m[j] = g[x](m[j] || 0);
            return m[H]("")
        }
    },
        xa = new wa;

    function O(k) {
        console.log(xa,xa.Dc);
        xa.Dc(k)
    };
    var ya = function (k, l) {
        var g = this;
        g.window = k;
        g.document = l;
        g.setTimeout = function (m, j) {
            setTimeout(m, j)
        };
        g.$a = function (m) {
            return navigator.userAgent[z](m) >= 0
        };
        g.xd = function () {
            return g.$a("Firefox") && ![].reduce
        };
        g.mb = function (m) {
            if (!m || !g.$a("Firefox")) return m;
            m = m.replace(/\n|\r/g, " ");
            for (var j = 0, p = m[B]; j < p; ++j) {
                var h = m.charCodeAt(j) & 255;
                if (h == 10 || h == 13) m = m[F](0, j) + "?" + m[F](j + 1)
            }
            return m
        }
    },
        P = new ya(aa, document);
    var za = function (k) {
        return function (l, g, m) {
            k[l] = function () {
                O(g);
                return m.apply(k, arguments)
            };
            return m
        }
    },
        Aa = function (k) {
            return Object.prototype[ha].call(Object(k)) == "[object Array]"
        },
        Q = function (k) {
            return u == k || "-" == k || "" == k
        },
        S = function (k, l, g) {
            var m = "-",
                j;
            if (!Q(k) && !Q(l) && !Q(g)) {
                j = k[z](l);
                if (j > -1) {
                    g = k[z](g, j);
                    if (g < 0) g = k[B];
                    m = k[F](j + l[z](L) + 1, g)
                }
            }
            return m
        },
        Ba = function (k) {
            var l = t,
                g = 0,
                m, j;
            if (!Q(k)) {
                l = q;
                for (m = 0; m < k[B]; m++) {
                    j = k[x](m);
                    g += "." == j ? 1 : 0;
                    l = l && g <= 1 && (0 == m && "-" == j || ".0123456789" [z](j) > -1)
                }
            }
            return l
        },
        T = function (k, l) {
            var g = encodeURIComponent;
            if (g instanceof Function) return l ? encodeURI(k) : g(k);
            else {
                O(68);
                return escape(k)
            }
        },
        Ca = function (k, l) {
            var g = decodeURIComponent,
                m;
            k = k[D]("+")[H](" ");
            if (g instanceof Function) try {
                m = l ? decodeURI(k) : g(k)
            } catch (j) {
                O(17);
                m = unescape(k)
            } else {
                O(68);
                m = unescape(k)
            }
            return m
        },
        U = function (k, l) {
            return k[z](l) > -1
        };

    function Ea(k) {
        if (!k || "" == k) return "";
        for (; k[x](0)[B] > 0 && " \n\r\t" [z](k[x](0)) > -1;) k = k[F](1);
        for (; k[x](k[B] - 1)[B] > 0 && " \n\r\t" [z](k[x](k[B] - 1)) > -1;) k = k[F](0, k[B] - 1);
        return k
    }
    var W = function (k, l) {
        k[ca] || O(94);
        k[k[B]] = l
    },
        Fa = function (k) {
            var l = 1,
                g = 0,
                m;
            if (!Q(k)) {
                l = 0;
                for (m = k[B] - 1; m >= 0; m--) {
                    g = k.charCodeAt(m);
                    l = (l << 6 & 268435455) + g + (g << 14);
                    g = l & 266338304;
                    l = g != 0 ? l ^ g >> 21 : l
                }
            }
            return l
        },
        Ga = function () {
            return w.round(w.random() * 2147483647)
        },
        Ha = function () {};
    var Ia = function (k, l) {
        this.Ra = k;
        this.eb = l
    },
        Ja = function () {
            function k(g) {
                var m = [];
                g = g[D](",");
                for (var j, p = 0; p < g[B]; p++) {
                    j = g[p][D](":");
                    m[ca](new Ia(j[0], j[1]))
                }
                return m
            }
            var l = this;
            l.ya = "utm_campaign";
            l.za = "utm_content";
            l.Aa = "utm_id";
            l.Ba = "utm_medium";
            l.Ca = "utm_nooverride";
            l.Da = "utm_source";
            l.Ea = "utm_term";
            l.Fa = "gclid";
            l.U = 0;
            l.w = 0;
            l.Ja = 15768E6;
            l.rb = 18E5;
            l.v = 63072E6;
            l.la = [];
            l.na = [];
            l.nc = "cse";
            l.oc = "q";
            l.hb = 5;
            l.P = k("daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,google:q,yahoo:p,yahoo:q,msn:q,bing:q,aol:query,aol:encquery,aol:q,lycos:query,ask:q,altavista:q,netscape:query,cnn:query,about:terms,mamma:q,alltheweb:q,voila:rdata,virgilio:qs,live:q,baidu:wd,alice:qs,yandex:text,najdi:q,mama:query,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,sesam:q,ozu:q,terra:query,mynet:q,ekolay:q,rambler:query,rambler:words");
            l.f = "/";
            l.Q = 100;
            l.ia = "/__utm.gif";
            l.Z = 1;
            l.$ = 1;
            l.u = "|";
            l.X = 1;
            l.Ka = 1;
            l.Ia = 1;
            l.b = "auto";
            l.D = 1;
            l.Nc = 10;
            l.Ob = 10;
            l.Oc = 0.2;
            l.n = u
        };
    var Ka = function (k) {
        function l(a, c, i, e) {
            var d = "",
                r = 0;
            d = S(a, "2" + c, ";");
            if (!Q(d)) {
                a = d[z]("^" + i + ".");
                if (a < 0) return ["", 0];
                d = d[F](a + i[B] + 2);
                if (d[z]("^") > 0) d = d[D]("^")[0];
                i = d[D](":");
                d = i[1];
                r = parseInt(i[0], 10);
                if (!e && r < j.r) d = ""
            }
            if (Q(d)) d = "";
            return [d, r]
        }
        function g(a, c) {
            return "^" + [
                [c, a[1]][H]("."), a[0]
            ][H](":")
        }
        function m(a) {
            var c = new Date;
            a = new Date(c[ga]() + a);
            return "expires=" + a.toGMTString() + "; "
        }
        var j = this,
            p = k;
        j.r = (new Date)[ga]();
        var h = [N, pa, qa, ta, sa, ua, va];
        j.h = function () {
            var a = P[C][ea];
            return p.n ? j.Wb(a, p.n) : a
        };
        j.Wb = function (a, c) {
            for (var i = [], e, d = 0; d < h[B]; d++) {
                e = l(a, h[d], c)[0];
                Q(e) || (i[i[B]] = h[d] + e + ";")
            }
            return i[H]("")
        };
        j.l = function (a, c, i) {
            var e = i > 0 ? m(i) : "";
            if (p.n) {
                c = j.jc(P[C][ea], a, p.n, c, i);
                a = "2" + a;
                e = i > 0 ? m(p.v) : ""
            }
            a += c;
            a = P.mb(a);
            if (a[B] > 2E3) {
                O(69);
                a = a[F](0, 2E3)
            }
            e = a + "; path=" + p.f + "; " + e + j.Ua();
            P[C].cookie = e
        };
        j.jc = function (a, c, i, e, d) {
            var r = "";
            d = d || p.v;
            e = g([e, j.r + d * 1], i);
            r = S(a, "2" + c, ";");
            if (!Q(r)) {
                a = g(l(a, c, i, q), i);
                r = r[D](a)[H]("");
                return r = e + r
            }
            return e
        };
        j.Ua = function () {
            return Q(p.b) ? "" : "domain=" + p.b + ";"
        }
    };
    var La = function (k) {
        function l(f) {
            f = Aa(f) ? f[H](".") : "";
            return Q(f) ? "-" : f
        }
        function g(f, n) {
            var s = [],
                o;
            if (!Q(f)) {
                s = f[D](".");
                if (n) for (o = 0; o < s[B]; o++) Ba(s[o]) || (s[o] = "-")
            }
            return s
        }
        function m(f, n, s) {
            var o = d.I,
                v, y;
            for (v = 0; v < o[B]; v++) {
                y = o[v][0];
                y += Q(n) ? n : n + o[v][4];
                o[v][2](S(f, y, s))
            }
        }
        var j, p, h, a, c, i, e, d = this,
            r, b = k;
        d.g = new Ka(k);
        d.bb = function () {
            return u == r || r == d.L()
        };
        d.h = function () {
            return d.g.h()
        };
        d.ga = function () {
            return c ? c : "-"
        };
        d.ub = function (f) {
            c = f
        };
        d.qa = function (f) {
            r = Ba(f) ? f * 1 : "-"
        };
        d.fa = function () {
            return l(i)
        };
        d.ra = function (f) {
            i = g(f)
        };
        d.Ub = function () {
            d.g.l(sa, "", -1)
        };
        d.kc = function () {
            return r ? r : "-"
        };
        d.Ua = function () {
            return Q(b.b) ? "" : "domain=" + b.b + ";"
        };
        d.da = function () {
            return l(j)
        };
        d.sb = function (f) {
            j = g(f, 1)
        };
        d.z = function () {
            return l(p)
        };
        d.pa = function (f) {
            p = g(f, 1)
        };
        d.ea = function () {
            return l(h)
        };
        d.tb = function (f) {
            h = g(f, 1)
        };
        d.ha = function () {
            return l(a)
        };
        d.vb = function (f) {
            a = g(f);
            for (f = 0; f < a[B]; f++) if (f < 4 && !Ba(a[f])) a[f] = "-"
        };
        d.dc = function () {
            return e
        };
        d.Gc = function (f) {
            e = f
        };
        d.Rb = function () {
            j = [];
            p = [];
            h = [];
            a = [];
            c = u;
            i = [];
            r = u
        };
        d.L = function () {
            for (var f = "", n = 0; n < d.I[B]; n++) f += d.I[n][1]();
            return Fa(f)
        };
        d.ma = function (f) {
            var n = d.h(),
                s = t;
            if (n) {
                m(n, f, ";");
                d.qa(ba(d.L()));
                s = q
            }
            return s
        };
        d.yc = function (f) {
            m(f, "", K);
            d.qa(S(f, ra, K))
        };
        d.Lc = function () {
            var f = d.I,
                n = [],
                s;
            for (s = 0; s < f[B]; s++) W(n, f[s][0] + f[s][1]());
            W(n, ra + d.L());
            return n[H](K)
        };
        d.Sc = function (f, n) {
            var s = d.I,
                o = b.f;
            d.ma(f);
            b.f = n;
            for (var v = 0; v < s[B]; v++) if (!Q(s[v][1]())) s[v][3]();
            b.f = o
        };
        d.Gb = function () {
            d.g.l(N, d.da(), b.v)
        };
        d.va = function () {
            d.g.l(pa, d.z(), b.rb)
        };
        d.Hb = function () {
            d.g.l(qa, d.ea(), 0)
        };
        d.xa = function () {
            d.g.l(ta, d.ha(), b.Ja)
        };
        d.Ib = function () {
            d.g.l(ua, d.ga(), b.v)
        };
        d.wa = function () {
            d.g.l(sa, d.fa(), b.v)
        };
        d.Uc = function () {
            d.g.l(va, d.dc(), 0)
        };
        d.I = [
            [N, d.da, d.sb, d.Gb, "."],
            [pa, d.z, d.pa, d.va, ""],
            [qa, d.ea, d.tb, d.Hb, ""],
            [ua, d.ga, d.ub, d.Ib, ""],
            [ta, d.ha, d.vb, d.xa, "."],
            [sa, d.fa, d.ra, d.wa, "."]
        ]
    };
    var Ma = function () {
        var k = this;
        k.qb = function (l, g, m, j, p) {
            g[B] <= 2036 || p ? k.pb(l + "?" + g, j) : k.pb(l + "?" + m + "&err=len&max=2036&len=" + g[B], j)
        };
        k.pb = function (l, g) {
            var m = new Image(1, 1);
            m.src = l;
            m.onload = function () {
                m.onload = null;
                (g || Ha)()
            }
        }
    };
    var Na = function (k) {
        var l = this,
            g = k,
            m = new La(g),
            j = new Ma,
            p = !X.Tc(),
            h = function () {};
        l.hc = function () {
            return "https:" == P[C][E].protocol ? "https://ssl.google-analytics.com/__utm.gif" : "http://www.google-analytics.com/__utm.gif"
        };
        l.C = function (a, c, i, e, d, r) {
            var b = g.D,
                f = P[C][E];
            m.ma(i);
            var n = m.z()[D](".");
            if (n[1] < 500 || e) {
                if (d) {
                    var s = (new Date)[ga](),
                        o;
                    o = (s - n[3]) * (g.Oc / 1E3);
                    if (o >= 1) {
                        n[2] = w.min(w.floor(n[2] * 1 + o), g.Ob);
                        n[3] = s
                    }
                }
                if (e || !d || n[2] >= 1) {
                    if (!e && d) n[2] = n[2] * 1 - 1;
                    n[1] = n[1] * 1 + 1;
                    d = "utmwv=" + la;
                    s = "&utmn=" + Ga();
                    e =
                    d + "e" + s;
                    a = d + s + (Q(f.hostname) ? "" : "&utmhn=" + T(f.hostname)) + (g.Q == 100 ? "" : "&utmsp=" + T(g.Q)) + a;
                    if (0 == b || 2 == b) {
                        f = 2 == b ? h : r || h;
                        p && j.qb(g.ia, a, e, f, q)
                    }
                    if (1 == b || 2 == b) {
                        c = "&utmac=" + c;
                        e += c;
                        a += c + "&utmcc=" + l.ac(i);
                        if (X.Qa) {
                            i = "&aip=1";
                            e += i;
                            a += i
                        }
                        a += "&utmu=" + xa.Vb();
                        p && j.qb(l.hc(), a, e, r)
                    }
                }
            }
            m.pa(n[H]("."));
            m.va()
        };
        l.ac = function (a) {
            for (var c = [], i = [N, ta, sa, ua], e = m.h(), d, r = 0; r < i[B]; r++) {
                d = S(e, i[r] + a, ";");
                if (!Q(d)) {
                    if (i[r] == sa) {
                        d = d[D](a + ".")[1][D]("|")[0];
                        if (Q(d)) continue;
                        d = a + "." + d
                    }
                    W(c, i[r] + d + ";")
                }
            }
            return T(c[H]("+"))
        }
    };
    var Oa = function () {
        var k = this;
        k.S = [];
        k.Za = function (l) {
            for (var g, m = k.S, j = 0; j < m[B]; j++) g = l == m[j].p ? m[j] : g;
            return g
        };
        k.Nb = function (l, g, m, j, p, h, a, c) {
            var i = k.Za(l);
            if (u == i) {
                i = new Oa.Kb(l, g, m, j, p, h, a, c);
                W(k.S, i)
            } else {
                i.Ha = g;
                i.Ab = m;
                i.yb = j;
                i.wb = p;
                i.Ma = h;
                i.xb = a;
                i.Oa = c
            }
            return i
        }
    };
    Oa.Jb = function (k, l, g, m, j, p) {
        var h = this;
        h.Eb = k;
        h.ta = l;
        h.q = g;
        h.La = m;
        h.jb = j;
        h.kb = p;
        h.ua = function () {
            return "&" + ["utmt=item", "tid=" + T(h.Eb), "ipc=" + T(h.ta), "ipn=" + T(h.q), "iva=" + T(h.La), "ipr=" + T(h.jb), "iqt=" + T(h.kb)][H]("&utm")
        }
    };
    Oa.Kb = function (k, l, g, m, j, p, h, a) {
        var c = this;
        c.p = k;
        c.Ha = l;
        c.Ab = g;
        c.yb = m;
        c.wb = j;
        c.Ma = p;
        c.xb = h;
        c.Oa = a;
        c.N = [];
        c.Mb = function (i, e, d, r, b) {
            var f = c.ec(i),
                n = c.p;
            if (u == f) W(c.N, new Oa.Jb(n, i, e, d, r, b));
            else {
                f.Eb = n;
                f.ta = i;
                f.q = e;
                f.La = d;
                f.jb = r;
                f.kb = b
            }
        };
        c.ec = function (i) {
            for (var e, d = c.N, r = 0; r < d[B]; r++) e = i == d[r].ta ? d[r] : e;
            return e
        };
        c.ua = function () {
            return "&" + ["utmt=tran", "id=" + T(c.p), "st=" + T(c.Ha), "to=" + T(c.Ab), "tx=" + T(c.yb), "sp=" + T(c.wb), "ci=" + T(c.Ma), "rg=" + T(c.xb), "co=" + T(c.Oa)][H]("&utmt")
        }
    };
    var Pa = function (k) {
        function l() {
            var h, a, c;
            a = "ShockwaveFlash";
            var i = "$version",
                e = P[A].navigator;
            if ((e = e ? e.plugins : u) && e[B] > 0) for (h = 0; h < e[B] && !c; h++) {
                a = e[h];
                if (U(a.name, "Shockwave Flash")) c = a.description[D]("Shockwave Flash ")[1]
            } else {
                a = a + "." + a;
                try {
                    h = new ActiveXObject(a + ".7");
                    c = h.GetVariable(i)
                } catch (d) {}
                if (!c) try {
                    h = new ActiveXObject(a + ".6");
                    c = "WIN 6,0,21,0";
                    h.Vc = "always";
                    c = h.GetVariable(i)
                } catch (r) {}
                if (!c) try {
                    h = new ActiveXObject(a);
                    c = h.GetVariable(i)
                } catch (b) {}
                if (c) {
                    c = c[D](" ")[1][D](",");
                    c = c[0] + "." + c[1] + " r" + c[2]
                }
            }
            return c ? c : m
        }
        var g = this,
            m = "-",
            j = P[A].screen,
            p = P[A].navigator;
        g.ob = j ? j.width + "x" + j.height : m;
        g.nb = j ? j.colorDepth + "-bit" : m;
        g.Qb = T(P[C].characterSet ? P[C].characterSet : P[C].charset ? P[C].charset : m);
        g.fb = (p && p.language ? p.language : p && p.browserLanguage ? p.browserLanguage : m)[I]();
        g.db = p && p.javaEnabled() ? 1 : 0;
        g.Yb = k ? l() : m;
        g.Mc = function () {
            return K + "utm" + ["cs=" + T(g.Qb), "sr=" + g.ob, "sc=" + g.nb, "ul=" + g.fb, "je=" + g.db, "fl=" + T(g.Yb)][H]("&utm")
        };
        g.$b = function () {
            var h = P[A].navigator,
                a = P[A].history[B];
            h =
            h.appName + h.version + g.fb + h.platform + h.userAgent + g.db + g.ob + g.nb + (P[C][ea] ? P[C][ea] : "") + (P[C].referrer ? P[C].referrer : "");
            for (var c = h[B]; a > 0;) h += a-- ^ c++;
            return Fa(h)
        }
    };
    var Z = function (k, l, g, m) {
        function j(a) {
            var c = "";
            c = a[D]("://")[1][I]();
            if (U(c, "/")) c = c[D]("/")[0];
            return c
        }
        var p = m,
            h = this;
        h.a = k;
        h.lb = l;
        h.r = g;
        h.Ya = function (a) {
            var c = h.ca();
            return new Z.s(S(a, p.Aa + L, K), S(a, p.Da + L, K), S(a, p.Fa + L, K), h.M(a, p.ya, "(not set)"), h.M(a, p.Ba, "(not set)"), h.M(a, p.Ea, c && !Q(c.G) ? Ca(c.G) : u), h.M(a, p.za, u))
        };
        h.ab = function (a) {
            var c = j(a),
                i;
            i = a;
            var e = "";
            i = i[D]("://")[1][I]();
            if (U(i, "/")) {
                i = i[D]("/")[1];
                if (U(i, "?")) e = i[D]("?")[0]
            }
            i = e;
            if (U(c, "google")) {
                a = a[D]("?")[H](K);
                if (U(a, K + p.oc + L)) if (i == p.nc) return q
            }
            return t
        };
        h.ca = function () {
            var a, c = h.lb,
                i, e = p.P;
            if (!(Q(c) || "0" == c || !U(c, "://") || h.ab(c))) {
                a = j(c);
                for (var d = 0; d < e[B]; d++) {
                    i = e[d];
                    if (U(a, i.Ra[I]())) {
                        c = c[D]("?")[H](K);
                        if (U(c, K + i.eb + L)) {
                            a = c[D](K + i.eb + L)[1];
                            if (U(a, K)) a = a[D](K)[0];
                            return new Z.s(u, i.Ra, u, "(organic)", "organic", a, u)
                        }
                    }
                }
            }
        };
        h.M = function (a, c, i) {
            a = S(a, c + L, K);
            return i = !Q(a) ? Ca(a) : !Q(i) ? i : "-"
        };
        h.uc = function (a) {
            var c = p.la,
                i = t;
            if (a && "organic" == a.O) {
                a = Ca(a.G)[I]();
                for (var e = 0; e < c[B]; e++) i = i || c[e][I]() == a
            }
            return i
        };
        h.Wa = function () {
            var a = "",
                c = "";
            a = h.lb;
            if (!(Q(a) || "0" == a || !U(a, "://") || h.ab(a))) {
                a = a[D]("://")[1];
                if (U(a, "/")) {
                    c = a[F](a[z]("/"));
                    c = c[D]("?")[0];
                    a = a[D]("/")[0][I]()
                }
                if (0 == a[z]("www.")) a = a[F](4);
                return new Z.s(u, a, u, "(referral)", "referral", u, c)
            }
        };
        h.Ta = function (a) {
            var c = "";
            if (p.U) {
                c = a && a.hash ? a[ia][F](a[ia][z]("#")) : "";
                c = "" != c ? c + K : c
            }
            c += a.search;
            return c
        };
        h.ba = function () {
            return new Z.s(u, "(direct)", u, "(direct)", "(none)", u, u)
        };
        h.vc = function (a) {
            var c = t,
                i = p.na;
            if (a && "referral" == a.O) {
                a = T(a.R)[I]();
                for (var e = 0; e < i[B]; e++) c = c || U(a, i[e][I]())
            }
            return c
        };
        h.i = function (a) {
            return u != a && a.cb()
        };
        h.yd = function (a) {
            a = S(a, ta + h.a + ".", ";");
            var c = a[D](".");
            a = new Z.s;
            a.ib(c.slice(4)[H]("."));
            if (!h.i(a)) return q;
            c = P[C][E];
            c = h.Ta(c);
            c = h.Ya(c);
            if (!h.i(c)) {
                c = h.ca();
                h.i(c) || (c = h.Wa())
            }
            return h.i(c) && a.H()[I]() != c.H()[I]()
        };
        h.bc = function (a, c) {
            if (p.Ka) {
                var i = "",
                    e = "-",
                    d, r = 0,
                    b, f, n = h.a;
                if (a) {
                    f = a.h();
                    i = h.Ta(P[C][E]);
                    if (p.w && a.bb()) {
                        e = a.ha();
                        if (!Q(e) && !U(e, ";")) {
                            a.xa();
                            return
                        }
                    }
                    e = S(f, ta + n + ".", ";");
                    d = h.Ya(i);
                    if (h.i(d)) {
                        i = S(i, p.Ca + L, K);
                        if ("1" == i && !Q(e)) return
                    }
                    if (!h.i(d)) {
                        d =
                        h.ca();
                        i = h.uc(d);
                        if (!Q(e) && i) return;
                        if (i) d = h.ba()
                    }
                    if (!h.i(d) && c) {
                        d = h.Wa();
                        i = h.vc(d);
                        if (!Q(e) && i) return;
                        if (i) d = h.ba()
                    }
                    if (!h.i(d)) if (Q(e) && c) d = h.ba();
                    if (h.i(d)) {
                        if (!Q(e)) {
                            r = e[D](".");
                            b = new Z.s;
                            b.ib(r.slice(4)[H]("."));
                            b = b.H()[I]() == d.H()[I]();
                            r = r[3] * 1
                        }
                        if (!b || c) {
                            f = S(f, N + n + ".", ";");
                            b = f.lastIndexOf(".");
                            f = b > 9 ? f[F](b + 1) * 1 : 0;
                            r++;
                            f = 0 == f ? 1 : f;
                            a.vb([n, h.r, f, r, d.H()][H]("."));
                            a.xa()
                        }
                    }
                }
            }
        }
    };
    Z.s = function (k, l, g, m, j, p, h) {
        var a = this;
        a.p = k;
        a.R = l;
        a.W = g;
        a.q = m;
        a.O = j;
        a.G = p;
        a.Na = h;
        a.H = function () {
            var c = [],
                i = [
                    ["cid", a.p],
                    ["csr", a.R],
                    ["gclid", a.W],
                    ["ccn", a.q],
                    ["cmd", a.O],
                    ["ctr", a.G],
                    ["cct", a.Na]
                ],
                e, d;
            if (a.cb()) for (e = 0; e < i[B]; e++) if (!Q(i[e][1])) {
                d = i[e][1][D]("+")[H]("%20");
                d = d[D](" ")[H]("%20");
                W(c, "utm" + i[e][0] + L + d)
            }
            return P.mb(c[H]("|"))
        };
        a.cb = function () {
            return !(Q(a.p) && Q(a.R) && Q(a.W))
        };
        a.ib = function (c) {
            var i = function (e) {
                return Ca(S(c, "utm" + e + L, "|"))
            };
            a.p = i("cid");
            a.R = i("csr");
            a.W = i("gclid");
            a.q =
            i("ccn");
            a.O = i("cmd");
            a.G = i("ctr");
            a.Na = i("cct")
        }
    };
    var Qa = function (k, l, g, m) {
        var j = this,
            p = l,
            h = L,
            a = k,
            c = m;
        j.K = g;
        j.ka = "";
        j.o = {};
        j.sc = function () {
            var i;
            i = S(j.K.h(), sa + p + ".", ";")[D](p + ".")[1];
            if (!Q(i)) {
                i = i[D]("|");
                var e = j.o,
                    d = i[1],
                    r;
                if (!Q(d)) {
                    d = d[D](",");
                    for (var b = 0; b < d[B]; b++) {
                        r = d[b];
                        if (!Q(r)) {
                            r = r[D](h);
                            if (r[B] == 4) e[r[0]] = [r[1], r[2], 1]
                        }
                    }
                }
                j.ka = i[0];
                j.T()
            }
        };
        j.T = function () {
            j.Pb();
            var i = j.ka,
                e, d, r = "";
            for (e in j.o) if ((d = j.o[e]) && 1 === d[2]) r += e + h + d[0] + h + d[1] + h + 1 + ",";
            Q(r) || (i += "|" + r);
            if (Q(i)) j.K.Ub();
            else {
                j.K.ra(p + "." + i);
                j.K.wa()
            }
        };
        j.Hc = function (i) {
            j.ka = i;
            j.T()
        };
        j.Fc = function (i, e, d, r) {
            if (1 != r && 2 != r && 3 != r) r = 3;
            var b = t;
            if (e && d && i > 0 && i <= a.hb) {
                e = T(e);
                d = T(d);
                if (e[B] + d[B] <= 64) {
                    j.o[i] = [e, d, r];
                    j.T();
                    b = q
                }
            }
            return b
        };
        j.mc = function (i) {
            if ((i = j.o[i]) && 1 === i[2]) return i[1]
        };
        j.Tb = function (i) {
            var e = j.o;
            if (e[i]) {
                delete e[i];
                j.T()
            }
        };
        j.Pb = function () {
            c.t(8);
            c.t(9);
            c.t(11);
            var i = j.o,
                e, d;
            for (d in i) if (e = i[d]) {
                c.k(8, d, e[0]);
                c.k(9, d, e[1]);
                (e = e[2]) && 3 != e && c.k(11, d, "" + e)
            }
        }
    };
    var Ra = function () {
        function k(o, v, y, M) {
            if (u == h[o]) h[o] = {};
            if (u == h[o][v]) h[o][v] = [];
            h[o][v][y] = M
        }
        function l(o, v, y) {
            if (u != h[o] && u != h[o][v]) return h[o][v][y]
        }
        function g(o, v) {
            if (u != h[o] && u != h[o][v]) {
                h[o][v] = u;
                var y = q,
                    M;
                for (M = 0; M < i[B]; M++) if (u != h[o][i[M]]) {
                    y = t;
                    break
                }
                if (y) h[o] = u
            }
        }
        function m(o) {
            var v = "",
                y = t,
                M, V;
            for (M = 0; M < i[B]; M++) {
                V = o[i[M]];
                if (u != V) {
                    if (y) v += i[M];
                    y = [];
                    var J = void 0,
                        G = void 0;
                    for (G = 0; G < V[B]; G++) if (u != V[G]) {
                        J = "";
                        if (G != s && u == V[G - 1]) J += G[ha]() + b;
                        var R;
                        R = V[G];
                        var ma = "",
                            Y = void 0,
                            da = void 0,
                            Da = void 0;
                        for (Y = 0; Y < R[B]; Y++) {
                            da = R[x](Y);
                            Da = n[da];
                            ma += u != Da ? Da : da
                        }
                        R = ma;
                        J += R;
                        W(y, J)
                    }
                    V = e + y[H](r) + d;
                    v += V;
                    y = t
                } else y = q
            }
            return v
        }
        var j = this,
            p = za(j),
            h = {},
            a = "k",
            c = "v",
            i = [a, c],
            e = "(",
            d = ")",
            r = "*",
            b = "!",
            f = "'",
            n = {};
        n[f] = "'0";
        n[d] = "'1";
        n[r] = "'2";
        n[b] = "'3";
        var s = 1;
        j.qc = function (o) {
            return u != h[o]
        };
        j.B = function () {
            var o = "",
                v;
            for (v in h) if (u != h[v]) o += v[ha]() + m(h[v]);
            return o
        };
        j.zc = function (o) {
            if (o == u) return j.B();
            var v = o.B(),
                y;
            for (y in h) if (u != h[y] && !o.qc(y)) v += y[ha]() + m(h[y]);
            return v
        };
        j.k = p("_setKey", 89, function (o, v, y) {
            if (typeof y != "string") return t;
            k(o, a, v, y);
            return q
        });
        j.sa = p("_setValue", 90, function (o, v, y) {
            if (typeof y != "number" && (u == Number || !(y instanceof Number)) || w.round(y) != y || y == NaN || y == Infinity) return t;
            k(o, c, v, y[ha]());
            return q
        });
        j.fc = p("_getKey", 87, function (o, v) {
            return l(o, a, v)
        });
        j.lc = p("_getValue", 88, function (o, v) {
            return l(o, c, v)
        });
        j.t = p("_clearKey", 85, function (o) {
            g(o, a)
        });
        j.V = p("_clearValue", 86, function (o) {
            g(o, c)
        })
    };
    var Sa = function (k, l) {
        var g = this,
            m = za(g);
        g.Ad = l;
        g.xc = k;
        g.Bb = m("_trackEvent", 91, function (j, p, h) {
            return l.Bb(g.xc, j, p, h)
        })
    };
    var Ta = function (k, l) {
        var g = this,
            m = P[A].external,
            j = P[A].webkitPerformance,
            p = 10;
        g.gb = new Ra;
        g.gc = function () {
            var h, a = "timing",
                c = "onloadT";
            if (m && m[c] != u && m.isValidLoadTime) h = m[c];
            else if (j && j[a]) h = j[a].loadEventStart - j[a].navigationStart;
            return h
        };
        g.Kc = function () {
            return k.F() && k.Fb() % 100 < p
        };
        g.Bc = function () {
            var h = "&utmt=event&utme=" + T(g.gb.B()) + k.oa();
            l.C(h, k.m, k.a, t, q)
        };
        g.zb = function () {
            var h = g.gc();
            if (h == u) return t;
            if (h <= 0) return q;
            if (h > 2147483648) return t;
            var a = g.gb;
            a.t(14);
            a.V(14);
            (h = a.k(14, 1, "pl") && a.sa(14, 1, h)) && g.Bc();
            m && m.isValidLoadTime != u && m.setPageReadyTime();
            return t
        };
        g.Cb = function () {
            if (!g.Kc()) return t;
            if (P[A].top != P[A]) return t;
            if (g.zb()) {
                var h = P[A],
                    a = "load",
                    c = g.zb;
                if (h.addEventListener) h.addEventListener(a, c, t);
                else h.attachEvent && h.attachEvent("on" + a, c)
            }
            return q
        }
    };
    var $ = function () {};
    $.Xb = function (k) {
        var l = "gaso=",
            g = P[C][E].hash;
        if (g && 1 == g[z](l)) k = S(g, l, K);
        else k = (g = P[A].name) && 0 <= g[z](l) ? S(g, l, K) : S(k.h(), va, ";");
        return k
    };
    $.wc = function (k, l) {
        var g = (l || "www") + ".google.com";
        g = "https://" + g + "/analytics/reporting/overlay_js?gaso=" + k + K + Ga();
        var m = "_gasojs",
            j = P[C].createElement("script");
        j.type = "text/javascript";
        j.src = g;
        if (m) j.id = m;
        (P[C].getElementsByTagName("head")[0] || P[C].getElementsByTagName("body")[0]).appendChild(j)
    };
    $.load = function (k, l) {
        if (!$.tc) {
            var g = $.Xb(l),
                m = g && g.match(/^(?:\|([-0-9a-z.]{1,30})\|)?([-.\w]{10,1200})$/i);
            if (m) {
                l.Gc(g);
                l.Uc();
                X._gasoDomain = k.b;
                X._gasoCPath = k.f;
                $.wc(m[2], m[1])
            }
            $.tc = q
        }
    };
    var Ua = function (k, l, g) {
        function m() {
            if ("auto" == e.b) {
                var b = P[C].domain;
                if ("www." == b[F](0, 4)) b = b[F](4);
                e.b = b
            }
            e.b = e.b[I]()
        }
        function j() {
            m();
            var b = e.b,
                f = b[z]("www.google.") * b[z](".google.") * b[z]("google.");
            return f || "/" != e.f || b[z]("google.org") > -1
        }
        function p(b, f, n) {
            if (Q(b) || Q(f) || Q(n)) return "-";
            b = S(b, N + a.a + ".", f);
            if (!Q(b)) {
                b = b[D](".");
                b[5] = "" + (b[5] ? b[5] * 1 + 1 : 1);
                b[3] = b[4];
                b[4] = n;
                b = b[H](".")
            }
            return b
        }
        function h() {
            return "file:" != P[C][E].protocol && j()
        }
        var a = this,
            c = za(a),
            i = u,
            e = new Ja,
            d = t,
            r = u;
        a.q = k;
        a.r = w.round((new Date)[ga]() / 1E3);
        a.m = l || "UA-XXXXX-X";
        a.Pa = P[C].referrer;
        a.aa = u;
        a.d = u;
        a.A = t;
        a.J = u;
        a.e = u;
        a.Sa = u;
        a.ja = u;
        a.a = u;
        a.j = u;
        e.n = g ? T(g) : u;
        a.ic = function () {
            return Ga() ^ a.J.$b() & 2147483647
        };
        a.cc = function () {
            if (!e.b || "" == e.b || "none" == e.b) {
                e.b = "";
                return 1
            }
            m();
            return e.Ia ? Fa(e.b) : 1
        };
        a.Zb = function (b, f) {
            if (Q(b)) b = "-";
            else {
                f += e.f && "/" != e.f ? e.f : "";
                var n = b[z](f);
                b = n >= 0 && n <= 8 ? "0" : "[" == b[x](0) && "]" == b[x](b[B] - 1) ? "-" : b
            }
            return b
        };
        a.oa = function (b) {
            var f = "";
            f += e.X ? a.J.Mc() : "";
            f += e.Z && !Q(P[C].title) ? "&utmdt=" + T(P[C].title) : "";
            var n;
            n = u;
            if (P[A] && P[A][fa] && P[A][fa].hid) n = P[A][fa].hid;
            else {
                n = Ga();
                P[A].gaGlobal = P[A][fa] ? P[A][fa] : {};
                P[A][fa].hid = n
            }
            f += "&utmhid=" + n + "&utmr=" + T(ba(a.aa)) + "&utmp=" + T(a.Ac(b));
            return f
        };
        a.Ac = function (b) {
            var f = P[C][E];
            b && O(13);
            return b = u != b && "" != b ? T(b, q) : T(f.pathname + f.search, q)
        };
        a.Qc = function (b) {
            if (a.F()) {
                var f = "";
                if (a.e != u && a.e.B()[B] > 0) f += "&utme=" + T(a.e.B());
                f += a.oa(b);
                i.C(f, a.m, a.a)
            }
        };
        a.Sb = function () {
            var b = new La(e);
            return b.ma(a.a) ? b.Lc() : u
        };
        a.Va = c("_getLinkerUrl", 52, function (b, f) {
            var n = b[D]("#"),
                s = b,
                o = a.Sb();
            if (o) if (f && 1 >= n[B]) s += "#" + o;
            else if (!f || 1 >= n[B]) if (1 >= n[B]) s += (U(b, "?") ? K : "?") + o;
            else s = n[0] + (U(b, "?") ? K : "?") + o + "#" + n[1];
            return s
        });
        a.pc = function () {
            var b = a.r,
                f = a.j,
                n = f.h(),
                s = a.a + "",
                o = P[A] ? P[A][fa] : u,
                v, y = U(n, N + s + "."),
                M = U(n, pa + s),
                V = U(n, qa + s),
                J, G = [],
                R = "",
                ma = t;
            n = Q(n) ? "" : n;
            if (e.w) {
                v = P[C][E] && P[C][E].hash ? P[C][E][ia][F](P[C][E][ia][z]("#")) : "";
                if (e.U && !Q(v)) R = v + K;
                R += P[C][E].search;
                if (!Q(R) && U(R, N)) {
                    f.yc(R);
                    f.bb() || f.Rb();
                    J = f.da()
                }
                v = f.ga;
                var Y = f.ub,
                    da = f.Ib;
                if (!Q(v())) {
                    Y(Ca(v()));
                    U(v(), ";") || da()
                }
                v = f.fa;
                Y = f.ra;
                da = f.wa;
                if (!Q(v())) {
                    Y(v());
                    U(v(), ";") || da()
                }
            }
            if (Q(J)) if (y) if (J = !M || !V) {
                J = p(n, ";", ba(b));
                a.A = q
            } else {
                J = S(n, N + s + ".", ";");
                G = S(n, pa + s, ";")[D](".")
            } else {
                J = [s, a.ic(), b, b, b, 1][H](".");
                ma = a.A = q
            } else if (Q(f.z()) || Q(f.ea())) {
                J = p(R, K, ba(b));
                a.A = q
            } else {
                G = f.z()[D](".");
                s = G[0]
            }
            J = J[D](".");
            if (P[A] && o && o.dh == s && !e.n) {
                J[4] = o.sid ? o.sid : J[4];
                if (ma) {
                    J[3] = o.sid ? o.sid : J[4];
                    if (o.vid) {
                        b = o.vid[D](".");
                        J[1] = b[0];
                        J[2] = b[1]
                    }
                }
            }
            f.sb(J[H]("."));
            G[0] = s;
            G[1] = G[1] ? G[1] : 0;
            G[2] = u != G[2] ? G[2] : e.Nc;
            G[3] = G[3] ? G[3] : J[4];
            f.pa(G[H]("."));
            f.tb(s);
            Q(f.kc()) || f.qa(f.L());
            f.Gb();
            f.va();
            f.Hb()
        };
        a.rc = function () {
            i = new Na(e)
        };
        a.getName = c("_getName", 58, function () {
            return a.q
        });
        a.c = c("_initData", 2, function () {
            var b;
            if (!d) {
                if (!a.J) a.J = new Pa(e.$);
                a.a = a.cc();
                a.j = new La(e);
                a.e = new Ra;
                r = new Qa(e, ba(a.a), a.j, a.e);
                a.rc()
            }
            if (h()) {
                if (!d) {
                    a.aa = a.Zb(a.Pa, P[C].domain);
                    b = new Z(ba(a.a), a.aa, a.r, e)
                }
                a.pc(b);
                r.sc()
            }
            if (!d) {
                h() && b.bc(a.j, a.A);
                a.Sa = new Ra;
                $.load(e, a.j);
                d = q
            }
        });
        a.Fb = c("_visitCode", 54, function () {
            a.c();
            var b = S(a.j.h(), N + a.a + ".", ";");
            b = b[D](".");
            return b[B] < 4 ? "" : b[1]
        });
        a.ed = c("_cookiePathCopy", 30, function (b) {
            a.c();
            a.j && a.j.Sc(a.a, b)
        });
        a.F = function () {
            return a.Fb() % 1E4 < e.Q * 100
        };
        a.me = c("_trackPageview", 1, function (b) {
            if (h()) {
                a.c();
                a.Pc();
                a.Qc(b);
                a.A = t
            }
        });
        a.Pc = function () {
            var b = P[A];
            if (Ga() % 1E3 === 42) try {
                if (b.external && b.external.onloadT != u || b.webkitPerformance && b.webkitPerformance.timing) O(12)
            } catch (f) {}
        };
        a.ne = c("_trackTrans", 18, function () {
            var b = a.a,
                f = [],
                n, s, o;
            a.c();
            if (a.d && a.F()) {
                for (n = 0; n < a.d.S[B]; n++) {
                    s = a.d.S[n];
                    W(f, s.ua());
                    for (o = 0; o < s.N[B]; o++) W(f, s.N[o].ua())
                }
                for (n =
                0; n < f[B]; n++) i.C(f[n], a.m, b, q)
            }
        });
        a.he = c("_setTrans", 20, function () {
            var b, f, n, s;
            b = P[C].getElementById ? P[C].getElementById("utmtrans") : P[C].utmform && P[C].utmform.utmtrans ? P[C].utmform.utmtrans : u;
            a.c();
            if (b && b.value) {
                a.d = new Oa;
                s = b.value[D]("UTM:");
                e.u = !e.u || "" == e.u ? "|" : e.u;
                for (b = 0; b < s[B]; b++) {
                    s[b] = Ea(s[b]);
                    f = s[b][D](e.u);
                    for (n = 0; n < f[B]; n++) f[n] = Ea(f[n]);
                    if ("T" == f[0]) a.Ga(f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8]);
                    else "I" == f[0] && a.Lb(f[1], f[2], f[3], f[4], f[5], f[6])
                }
            }
        });
        a.Ga = c("_addTrans", 21, function (b, f, n, s, o, v, y, M) {
            a.d = a.d ? a.d : new Oa;
            return a.d.Nb(b, f, n, s, o, v, y, M)
        });
        a.Lb = c("_addItem", 19, function (b, f, n, s, o, v) {
            var y;
            a.d = a.d ? a.d : new Oa;
            (y = a.d.Za(b)) || (y = a.Ga(b, "", "", "", "", "", "", ""));
            y.Mb(f, n, s, o, v)
        });
        a.je = c("_setVar", 22, function (b) {
            if (b && "" != b && j()) {
                a.c();
                r.Hc(T(b));
                a.F() && i.C("&utmt=var", a.m, a.a)
            }
        });
        a.Td = c("_setCustomVar", 10, function (b, f, n, s) {
            a.c();
            return r.Fc(b, f, n, s)
        });
        a.jd = c("_deleteCustomVar", 35, function (b) {
            a.c();
            r.Tb(b)
        });
        a.ud = c("_getVisitorCustomVar", 50, function (b) {
            a.c();
            return r.mc(b)
        });
        a.ae = c("_setMaxCustomVariables", 71, function (b) {
            e.hb = b
        });
        a.link = c("_link", 101, function (b, f) {
            if (e.w && b) {
                a.c();
                P[C][E].href = a.Va(b, f)
            }
        });
        a.zd = c("_linkByPost", 102, function (b, f) {
            if (e.w && b && b.action) {
                a.c();
                b.action = a.Va(b.action, f)
            }
        });
        a.ke = c("_setXKey", 83, function (b, f, n) {
            a.e.k(b, f, n)
        });
        a.le = c("_setXValue", 84, function (b, f, n) {
            a.e.sa(b, f, n)
        });
        a.vd = c("_getXKey", 76, function (b, f) {
            return a.e.fc(b, f)
        });
        a.wd = c("_getXValue", 77, function (b, f) {
            return a.e.lc(b, f)
        });
        a.cd = c("_clearXKey", 72, function (b) {
            a.e.t(b)
        });
        a.dd =
        c("_clearXValue", 73, function (b) {
            a.e.V(b)
        });
        a.hd = c("_createXObj", 75, function () {
            a.c();
            return new Ra
        });
        a.Cc = c("_sendXEvent", 78, function (b) {
            var f = "";
            a.c();
            if (a.F()) {
                f += "&utmt=event&utme=" + T(a.e.zc(b)) + a.oa();
                i.C(f, a.m, a.a, t, q)
            }
        });
        a.gd = c("_createEventTracker", 74, function (b) {
            a.c();
            return new Sa(b, a)
        });
        a.Bb = c("_trackEvent", 4, function (b, f, n, s) {
            a.c();
            var o = a.Sa;
            if (u != b && u != f && "" != b && "" != f) {
                o.t(5);
                o.V(5);
                (b = o.k(5, 1, b) && o.k(5, 2, f) && (u == n || o.k(5, 3, n)) && (u == s || o.sa(5, 1, s))) && a.Cc(o)
            } else b = t;
            return b
        });
        a.Cb = c("_trackPageLoadTime", 100, function () {
            a.c();
            if (!a.ja) a.ja = new Ta(a, i);
            return a.ja.Cb()
        });
        a.nd = function () {
            return e
        };
        a.Wd = c("_setDomainName", 6, function (b) {
            e.b = b
        });
        a.Yc = c("_addOrganic", 14, function (b, f, n) {
            e.P.splice(n ? 0 : e.P[B], 0, new Ia(b, f))
        });
        a.bd = c("_clearOrganic", 70, function () {
            e.P = []
        });
        a.Wc = c("_addIgnoredOrganic", 15, function (b) {
            W(e.la, b)
        });
        a.$c = c("_clearIgnoredOrganic", 97, function () {
            e.la = []
        });
        a.Xc = c("_addIgnoredRef", 31, function (b) {
            W(e.na, b)
        });
        a.ad = c("_clearIgnoredRef", 32, function () {
            e.na = []
        });
        a.Dd = c("_setAllowHash", 8, function (b) {
            e.Ia =
            b ? 1 : 0
        });
        a.Od = c("_setCampaignTrack", 36, function (b) {
            e.Ka = b ? 1 : 0
        });
        a.Pd = c("_setClientInfo", 66, function (b) {
            e.X = b ? 1 : 0
        });
        a.md = c("_getClientInfo", 53, function () {
            return e.X
        });
        a.Qd = c("_setCookiePath", 9, function (b) {
            e.f = b
        });
        a.ie = c("_setTransactionDelim", 82, function (b) {
            e.u = b
        });
        a.Sd = c("_setCookieTimeout", 25, function (b) {
            a.Ec(b * 1E3)
        });
        a.Ec = c("_setCampaignCookieTimeout", 29, function (b) {
            e.Ja = b
        });
        a.Ud = c("_setDetectFlash", 61, function (b) {
            e.$ = b ? 1 : 0
        });
        a.od = c("_getDetectFlash", 65, function () {
            return e.$
        });
        a.Vd = c("_setDetectTitle", 62, function (b) {
            e.Z = b ? 1 : 0
        });
        a.pd = c("_getDetectTitle", 56, function () {
            return e.Z
        });
        a.Yd = c("_setLocalGifPath", 46, function (b) {
            e.ia = b
        });
        a.qd = c("_getLocalGifPath", 57, function () {
            return e.ia
        });
        a.$d = c("_setLocalServerMode", 92, function () {
            e.D = 0
        });
        a.de = c("_setRemoteServerMode", 63, function () {
            e.D = 1
        });
        a.Zd = c("_setLocalRemoteServerMode", 47, function () {
            e.D = 2
        });
        a.rd = c("_getServiceMode", 59, function () {
            return e.D
        });
        a.ee = c("_setSampleRate", 45, function (b) {
            e.Q = b
        });
        a.fe = c("_setSessionTimeout", 27, function (b) {
            a.Ic(b * 1E3)
        });
        a.Ic =
        c("_setSessionCookieTimeout", 26, function (b) {
            e.rb = b
        });
        a.Ed = c("_setAllowLinker", 11, function (b) {
            e.w = b ? 1 : 0
        });
        a.Cd = c("_setAllowAnchor", 7, function (b) {
            e.U = b ? 1 : 0
        });
        a.Ld = c("_setCampNameKey", 41, function (b) {
            e.ya = b
        });
        a.Hd = c("_setCampContentKey", 38, function (b) {
            e.za = b
        });
        a.Id = c("_setCampIdKey", 39, function (b) {
            e.Aa = b
        });
        a.Jd = c("_setCampMediumKey", 40, function (b) {
            e.Ba = b
        });
        a.Kd = c("_setCampNOKey", 42, function (b) {
            e.Ca = b
        });
        a.Md = c("_setCampSourceKey", 43, function (b) {
            e.Da = b
        });
        a.Nd = c("_setCampTermKey", 44, function (b) {
            e.Ea = b
        });
        a.Gd = c("_setCampCIdKey", 37, function (b) {
            e.Fa = b
        });
        a.kd = c("_getAccount", 64, function () {
            return a.m
        });
        a.Bd = c("_setAccount", 3, function (b) {
            a.m = b
        });
        a.be = c("_setNamespace", 48, function (b) {
            e.n = b ? T(b) : u
        });
        a.td = c("_getVersion", 60, function () {
            return la
        });
        a.Fd = c("_setAutoTrackOutbound", 79, Ha);
        a.ge = c("_setTrackOutboundSubdomains", 81, Ha);
        a.Xd = c("_setHrefExamineLimit", 80, Ha);
        a.ce = c("_setReferrerOverride", 49, function (b) {
            a.Pa = b
        });
        a.Rd = c("_setCookiePersistence", 24, function (b) {
            a.Jc(b)
        });
        a.Jc = c("_setVisitorCookieTimeout", 28, function (b) {
            e.v = b
        })
    };
    var Va = function () {
        var k = this,
            l = za(k);
        k.Qa = t;
        k.Db = {};
        k.Rc = 0;
        k._gasoDomain = u;
        k._gasoCPath = u;
        k.sd = l("_getTracker", 0, function (g, m) {
            return k.Y(g, u, m)
        });
        k.Y = l("_createTracker", 55, function (g, m, j) {
            m && O(23);
            j && O(67);
            if (m == u) m = "~" + X.Rc++;
            return X.Db[m] = new Ua(m, g, j)
        });
        k.Xa = l("_getTrackerByName", 51, function (g) {
            g = g || "";
            return X.Db[g] || X.Y(u, g)
        });
        k.Tc = function () {
            var g = aa[na];
            return g && g[oa] && g[oa]()
        };
        k.Zc = l("_anonymizeIp", 16, function () {
            k.Qa = q
        })
    };
    var Xa = function () {
        var k = this,
            l = za(k);
        k.fd = l("_createAsyncTracker", 33, function (g, m) {
            return X.Y(g, m || "")
        });
        k.ld = l("_getAsyncTracker", 34, function (g) {
            return X.Xa(g)
        });
        k.push = function () {
            O(5);
            for (var g = arguments, m = 0, j = 0; j < g[B]; j++) try {
                if (typeof g[j] === "function") g[j]();
                else {
                    var p = "",
                        h = g[j][0],
                        a = h.lastIndexOf(".");
                    if (a > 0) {
                        p = h[F](0, a);
                        h = h[F](a + 1)
                    }
                    var c = p == ja ? X : p == ka ? Wa : X.Xa(p);
                    c[h].apply(c, g[j].slice(1))
                }
            } catch (i) {
                m++
            }
            return m
        }
    };
    var X = new Va;
    var Ya = aa[ja];
    if (Ya && typeof Ya._getTracker == "function") X = Ya;
    else aa[ja] = X;
    var Wa = new Xa;
    a: {
        var Za = aa[ka],
            $a = t;
        if (Za && typeof Za[ca] == "function") {
            $a = Aa(Za);
            if (!$a) break a
        }
        aa[ka] = Wa;
        $a && Wa[ca].apply(Wa, Za)
    };
})()

