"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var user1, user2, account1, account2, listing1, listing2, reservation1, reservation2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.create({
                        data: {
                            name: 'John Doe',
                            username: 'johndoe',
                            email: 'john@example.com',
                            role: 'admin',
                            emailVerified: new Date(),
                            image: 'https://example.com/john.jpg',
                        },
                    })];
                case 1:
                    user1 = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                name: 'Jane Doe',
                                username: 'janedoe',
                                email: 'jane@example.com',
                                role: 'user',
                                emailVerified: new Date(),
                                image: 'https://example.com/jane.jpg',
                            },
                        })];
                case 2:
                    user2 = _a.sent();
                    return [4 /*yield*/, prisma.account.create({
                            data: {
                                userId: user1.id,
                                type: 'oauth',
                                provider: 'google',
                                providerAccountId: 'google123',
                                access_token: 'access_token_example',
                                refresh_token: 'refresh_token_example',
                            },
                        })];
                case 3:
                    account1 = _a.sent();
                    return [4 /*yield*/, prisma.account.create({
                            data: {
                                userId: user2.id,
                                type: 'oauth',
                                provider: 'facebook',
                                providerAccountId: 'facebook123',
                                access_token: 'access_token_example_fb',
                                refresh_token: 'refresh_token_example_fb',
                            },
                        })];
                case 4:
                    account2 = _a.sent();
                    // Seed Sessions
                    return [4 /*yield*/, prisma.session.create({
                            data: {
                                userId: user1.id,
                                sessionToken: 'session_token_123',
                                expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
                            },
                        })];
                case 5:
                    // Seed Sessions
                    _a.sent();
                    return [4 /*yield*/, prisma.session.create({
                            data: {
                                userId: user2.id,
                                sessionToken: 'session_token_456',
                                expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
                            },
                        })];
                case 6:
                    _a.sent();
                    // Seed Verification Tokens
                    return [4 /*yield*/, prisma.verificationToken.create({
                            data: {
                                identifier: 'john@example.com',
                                token: 'verification_token_123',
                                expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
                            },
                        })];
                case 7:
                    // Seed Verification Tokens
                    _a.sent();
                    return [4 /*yield*/, prisma.verificationToken.create({
                            data: {
                                identifier: 'jane@example.com',
                                token: 'verification_token_456',
                                expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
                            },
                        })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, prisma.listing.create({
                            data: {
                                name: 'Luxury Apartment',
                                location: 'New York',
                                type: 'Apartment',
                                desc: 'A luxury apartment in downtown with modern amenities.',
                                pricePerNight: 300,
                                beds: 2,
                                hasFreeWifi: true,
                            },
                        })];
                case 9:
                    listing1 = _a.sent();
                    return [4 /*yield*/, prisma.listing.create({
                            data: {
                                name: 'Cozy Cabin',
                                location: 'Colorado',
                                type: 'Cabin',
                                desc: 'A cozy cabin in the mountains.',
                                pricePerNight: 150,
                                beds: 1,
                                hasFreeWifi: false,
                            },
                        })];
                case 10:
                    listing2 = _a.sent();
                    // Seed Images
                    return [4 /*yield*/, prisma.image.create({
                            data: {
                                url: 'https://example.com/image1.jpg',
                                blurred: 'https://example.com/blurred1.jpg',
                                listingId: listing1.id,
                            },
                        })];
                case 11:
                    // Seed Images
                    _a.sent();
                    return [4 /*yield*/, prisma.image.create({
                            data: {
                                url: 'https://example.com/image2.jpg',
                                blurred: 'https://example.com/blurred2.jpg',
                                listingId: listing2.id,
                            },
                        })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, prisma.reservation.create({
                            data: {
                                startDate: new Date('2024-10-05'),
                                endDate: new Date('2024-10-10'),
                                chargeId: 'charge_1',
                                daysDifference: 5,
                                listingId: listing1.id,
                                userId: user1.id,
                            },
                        })];
                case 13:
                    reservation1 = _a.sent();
                    return [4 /*yield*/, prisma.reservation.create({
                            data: {
                                startDate: new Date('2024-11-01'),
                                endDate: new Date('2024-11-07'),
                                chargeId: 'charge_2',
                                daysDifference: 6,
                                listingId: listing2.id,
                                userId: user2.id,
                            },
                        })];
                case 14:
                    reservation2 = _a.sent();
                    // Seed Reserved Dates
                    return [4 /*yield*/, prisma.reservedDate.createMany({
                            data: [
                                { date: 20241005, reservationId: reservation1.id },
                                { date: 20241006, reservationId: reservation1.id },
                                { date: 20241101, reservationId: reservation2.id },
                                { date: 20241102, reservationId: reservation2.id },
                            ],
                        })];
                case 15:
                    // Seed Reserved Dates
                    _a.sent();
                    // Seed Reviews
                    return [4 /*yield*/, prisma.review.create({
                            data: {
                                text: 'Amazing apartment!',
                                stars: 5,
                                listingId: listing1.id,
                                userId: user2.id,
                            },
                        })];
                case 16:
                    // Seed Reviews
                    _a.sent();
                    return [4 /*yield*/, prisma.review.create({
                            data: {
                                text: 'Great cabin for a weekend getaway!',
                                stars: 4,
                                listingId: listing2.id,
                                userId: user1.id,
                            },
                        })];
                case 17:
                    _a.sent();
                    console.log('Seed data created.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
